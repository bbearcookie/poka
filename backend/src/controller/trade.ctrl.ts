import { NextFunction, Request, Response } from 'express';
import { body, param } from 'express-validator';
import { validate, isLoggedIn } from '@util/validator';
import { UserType } from '@util/jwt';

// 교환글 작성
export const postTrade = {
  validator: [
    isLoggedIn,
    body('haveVoucherId')
      .isNumeric().withMessage('소유권 ID는 숫자여야 해요.').bail()
      .custom((value) => Number(value) > 0).withMessage('등록할 소유권을 선택해주세요.').bail(),
    body('wantPhotocardIds')
      .not().isEmpty().withMessage('받을 포토카드를 선택해주세요.').bail()
      .isArray({ max: 10 }).withMessage('받을 포토카드의 종류는 최대 10종류까지 선택할 수 있어요.').bail(),
    body('amount')
      .isNumeric().withMessage('수량은 숫자여야 해요.')
      .custom((value) => Number(value) > 0).withMessage('받을 포토카드의 수량을 입력해주세요.').bail()
      .custom((value, { req }) => Number(value) <= req.body.wantPhotocardIds.length).withMessage('수량은 받을 포토카드로 선택한 종류의 갯수를 초과할 수 없어요.').bail(),
    validate
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    // TODO: 소유권이 자신 것인지 확인
    // TODO: 받으려는 포토카드에 사용할 소유권과 일치하는건 사용 불가능

    next();
  }
}