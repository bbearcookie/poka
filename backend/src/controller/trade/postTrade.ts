import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isLoggedIn } from '@validator/middleware/auth';
import { createResponseMessage } from '@validator/function/response';
import { LoginToken } from '@type/user';
import { selectUser } from '@service/user/select';
import { selectVoucherDetail } from '@service/voucher/select';
import { selectPhotoDetail } from '@service/photo/select';
import { writeTrade } from '@service/trade/insert';
import { TradeForm, TradeFormValidator } from '@validator/chain/trade';

interface Body extends TradeForm {}

const validator = [
  isLoggedIn,
  ...TradeFormValidator,
  validate
]

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const loggedUser = req.user as LoginToken;
  const { haveVoucherId, wantPhotocardIds, amount } = req.body as Body;

  // 사용자 정보 확인
  const [[user]] = await selectUser(loggedUser.userId);
  if (!user) return res.status(404).json({ message: '로그인한 사용자의 정보가 올바르지 않아요.' });

  // 소유권 정보 확인
  const [[voucher]] = await selectVoucherDetail(haveVoucherId);
  if (!voucher) return res.status(404).json(createResponseMessage('haveVoucherId', '사용하려는 소유권이 존재하지 않아요.'));
  if (voucher.state !== 'available') return res.status(404).json(createResponseMessage('haveVoucherId', '사용하려는 소유권이 이용 가능한 상태가 아니에요.'));
  if (voucher.owner.userId !== user.userId) return res.status(404).json(createResponseMessage('haveVoucherId', '사용하려는 소유권이 당신의 것이 아니에요.'));

  // 받을 포토카드와 일치하는 소유권은 사용 불가능
  for (let photoId of wantPhotocardIds) {
    const [[photo]] = await selectPhotoDetail(photoId);
    if (!photo) return res.status(404).json(createResponseMessage('wantPhotocardIds', '받을 포토카드의 정보가 올바르지 않아요.'));
    if (photo.photocardId === voucher.photo.photocardId) return res.status(400).json(createResponseMessage('wantPhotocardIds', '받을 포토카드는 등록할 소유권과 같은 종류일 수 없어요.'));
  }

  // 교환글 작성
  await writeTrade({
    userId: loggedUser.userId,
    voucherId: haveVoucherId,
    amount,
    wantPhotocardIds
  });

  return res.status(200).json({ message: '교환글을 작성했어요.' });
  next();
}

// 교환글 작성
const postTrade = [
  ...validator,
  controller
];

export default postTrade;