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

interface Body {
  voucherId: number;
  wantPhotocardIds: number[];
  amount: number;
}

const validator = [
  isLoggedIn,
  body('voucherId')
    .customSanitizer(v => Number(v))
    .isNumeric()
    .withMessage('소유권 ID는 숫자여야 해요.')
    .bail()
    .custom(value => Number(value) > 0)
    .withMessage('등록할 소유권을 선택해주세요.')
    .bail(),
  body('wantPhotocardIds')
    .not()
    .isEmpty()
    .withMessage('받을 포토카드를 선택해주세요.')
    .bail()
    .isArray({ max: 10 })
    .withMessage('받을 포토카드의 종류는 최대 10종류까지 선택할 수 있어요.')
    .bail(),
  body('wantPhotocardIds.*')
    .customSanitizer(v => Number(v))
    .isNumeric()
    .withMessage('받을 포토카드 ID는 숫자여야 해요.'),
  body('amount')
    .customSanitizer(v => Number(v))
    .isNumeric()
    .withMessage('수량은 숫자여야 해요.')
    .bail()
    .custom(v => v > 0)
    .withMessage('받을 포토카드의 수량을 입력해주세요.')
    .bail()
    .custom((v, { req }) => v <= req.body.wantPhotocardIds.length)
    .withMessage('수량은 받을 포토카드로 선택한 종류의 갯수를 초과할 수 없어요.')
    .bail(),
  validate,
];

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const loggedUser = req.user as LoginToken;
  const { voucherId, wantPhotocardIds, amount } = req.body as Body;

  // 사용자 정보 확인
  const [[user]] = await selectUser(loggedUser.userId);
  if (!user) return res.status(404).json({ message: '로그인한 사용자의 정보가 올바르지 않아요.' });

  // 소유권 정보 확인
  const [[voucher]] = await selectVoucherDetail(voucherId);
  if (!voucher)
    return res
      .status(404)
      .json(createResponseMessage('voucherId', '사용하려는 소유권이 존재하지 않아요.'));
  if (voucher.state !== 'available')
    return res
      .status(400)
      .json(createResponseMessage('voucherId', '사용하려는 소유권이 이용 가능한 상태가 아니에요.'));
  if (voucher.owner.userId !== user.userId)
    return res
      .status(400)
      .json(createResponseMessage('voucherId', '사용하려는 소유권이 당신의 것이 아니에요.'));

  // 받을 포토카드와 일치하는 소유권은 사용 불가능
  for (let photoId of wantPhotocardIds) {
    const [[photo]] = await selectPhotoDetail(photoId);
    if (!photo)
      return res
        .status(404)
        .json(createResponseMessage('wantPhotocardIds', '받을 포토카드의 정보가 올바르지 않아요.'));
    if (photo.photocardId === voucher.photo.photocardId)
      return res
        .status(400)
        .json(
          createResponseMessage(
            'wantPhotocardIds',
            '받을 포토카드는 등록할 소유권과 같은 종류일 수 없어요.'
          )
        );
  }

  // 교환글 작성
  await writeTrade({
    userId: loggedUser.userId,
    voucherId,
    amount,
    wantPhotocardIds,
  });

  return res.status(200).json({ message: '교환글을 작성했어요.' });
  next();
};

// 교환글 작성
const postTrade = [...validator, controller];

export default postTrade;
