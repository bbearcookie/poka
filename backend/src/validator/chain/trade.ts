import { body } from 'express-validator';

export interface TradeForm {
  haveVoucherId: number;
  wantPhotocardIds: number[];
  amount: number;
}

export const TradeFormValidator = [
  body('haveVoucherId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('소유권 ID는 숫자여야 해요.').bail()
    .custom((value) => Number(value) > 0).withMessage('등록할 소유권을 선택해주세요.').bail(),
  body('wantPhotocardIds')
    .not().isEmpty().withMessage('받을 포토카드를 선택해주세요.').bail()
    .isArray({ max: 10 }).withMessage('받을 포토카드의 종류는 최대 10종류까지 선택할 수 있어요.').bail(),
  body('wantPhotocardIds.*')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('받을 포토카드 ID는 숫자여야 해요.'),
  body('amount')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('수량은 숫자여야 해요.').bail()
    .custom(v => v > 0).withMessage('받을 포토카드의 수량을 입력해주세요.').bail()
    .custom((v, { req }) => v <= req.body.wantPhotocardIds.length).withMessage('수량은 받을 포토카드로 선택한 종류의 갯수를 초과할 수 없어요.').bail(),
]