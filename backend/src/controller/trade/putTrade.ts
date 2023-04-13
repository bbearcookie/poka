import { NextFunction, Request, Response } from 'express';
import { param, body } from 'express-validator';
import { isLoggedIn } from '@validator/middleware/auth';
import { validate } from '@validator/middleware/response';
import { createResponseMessage } from '@validator/function/response';
import { isAdminOrOwner } from '@validator/function/auth';
import { LoginToken } from '@type/user';
import { selectUser } from '@service/user/select';
import { selectTradeDetail } from '@service/trade/select';
import { selectPhotoDetail } from '@service/photo/select';
import { updateTrade } from '@service/trade/update';

interface Params {
  tradeId: number;
}

interface Body {
  wantPhotocardIds: number[];
  amount: number;
}

const validator = [
  isLoggedIn,
  param('tradeId')
    .customSanitizer(v => Number(v))
    .isNumeric()
    .withMessage('교환글 ID는 숫자여야 해요.'),
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
  const { tradeId } = req.params as unknown as Params;
  const { wantPhotocardIds, amount } = req.body as Body;

  // 사용자 정보 확인
  const [[user]] = await selectUser(loggedUser.userId);
  if (!user) return res.status(404).json({ message: '로그인한 사용자의 정보가 올바르지 않아요.' });

  // 교환글 정보 확인
  const [[trade]] = await selectTradeDetail(tradeId);
  if (!trade) return res.status(404).json({ message: '삭제하려는 교환글이 존재하지 않아요.' });
  if (trade.state !== 'trading')
    return res.status(400).json({ message: '이미 교환이 완료된 교환글은 삭제할 수 없어요.' });
  if (!isAdminOrOwner(loggedUser, trade.userId))
    return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });

  // 받을 포토카드와 일치하는 소유권은 사용 불가능
  for (let photoId of wantPhotocardIds) {
    const [[photo]] = await selectPhotoDetail(photoId);
    if (!photo)
      return res
        .status(404)
        .json(createResponseMessage('wantPhotocardIds', '받을 포토카드의 정보가 올바르지 않아요.'));
    if (photo.photocardId === trade.voucher.photocardId)
      return res
        .status(400)
        .json(
          createResponseMessage(
            'wantPhotocardIds',
            '받을 포토카드는 등록할 소유권과 같은 종류일 수 없어요.'
          )
        );
  }

  // 교환글 수정
  await updateTrade({
    trade,
    amount,
    wantPhotocardIds,
  });

  return res.status(200).json({ message: '교환글을 수정했어요.' });
  next();
};

// 교환글 수정
const putTrade = [...validator, controller];

export default putTrade;
