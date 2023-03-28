import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { isLoggedIn } from '@validator/middleware/auth';
import { validate } from '@validator/middleware/response';
import { createResponseMessage } from '@validator/function/response';
import { isAdminOrOwner } from '@validator/function/auth';
import { LoginToken } from '@type/user';
import { TradeForm, TradeFormValidator } from '@validator/chain/trade';
import { selectUserDetailByUserID } from '@service/user/select';
import { selectTradeDetail } from '@service/trade/select';
import { selectVoucherDetail } from '@service/voucher/select';
import { selectPhotoDetail } from '@service/photo/select';
import { updateTrade } from '@service/trade/update';

interface Params {
  tradeId: number;
}

interface Body extends TradeForm {}

const validator = [
  isLoggedIn,
  ...TradeFormValidator,
  param('tradeId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('교환글 ID는 숫자여야 해요.'),
  validate
]

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const loggedUser = req.user as LoginToken;
  const { tradeId } = req.params as unknown as Params;
  const { haveVoucherId, wantPhotocardIds, amount } = req.body as Body;
  
  // 사용자 정보 확인
  const [[user]] = await selectUserDetailByUserID(loggedUser.userId);
  if (!user) return res.status(404).json({ message: '로그인한 사용자의 정보가 올바르지 않아요.' });

  // 교환글 정보 확인
  const [[trade]] = await selectTradeDetail(tradeId);
  if (!trade) return res.status(404).json({ message: '삭제하려는 교환글이 존재하지 않아요.' });
  if (trade.state !== 'trading') return res.status(400).json({ message: '이미 교환이 완료된 교환글은 삭제할 수 없어요.' });
  if (!isAdminOrOwner(loggedUser, trade.userId)) return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });

  // 소유권 정보 확인
  const [[voucher]] = await selectVoucherDetail(haveVoucherId);
  if (!voucher) return res.status(404).json(createResponseMessage('haveVoucherId', '사용하려는 소유권이 존재하지 않아요.'));
  if (voucher.state !== 'available' && voucher.voucherId !== trade.voucher.voucherId) return res.status(404).json(createResponseMessage('haveVoucherId', '사용하려는 소유권이 이용 가능한 상태가 아니에요.'));
  if (voucher.owner.userId !== user.userId) return res.status(404).json(createResponseMessage('haveVoucherId', '사용하려는 소유권이 당신의 것이 아니에요.'));

  // 받을 포토카드와 일치하는 소유권은 사용 불가능
  for (let photoId of wantPhotocardIds) {
    const [[photo]] = await selectPhotoDetail(photoId);
    if (!photo) return res.status(404).json(createResponseMessage('wantPhotocardIds', '받을 포토카드의 정보가 올바르지 않아요.'));
    if (photo.photocardId === voucher.photo.photocardId) return res.status(400).json(createResponseMessage('wantPhotocardIds', '받을 포토카드는 등록할 소유권과 같은 종류일 수 없어요.'));
  }

  // 교환글 수정
  await updateTrade({
    trade,
    voucherId: haveVoucherId,
    amount,
    wantPhotocardIds
  });

  return res.status(200).json({ message: '교환글을 수정했어요.' });
  next();
}

// 교환글 수정
const putTrade = [
  ...validator,
  controller
];

export default putTrade;