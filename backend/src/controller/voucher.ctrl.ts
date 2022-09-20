import { Request, Response } from 'express';
import * as VoucherService from '@service/voucher.service';
import { body, param } from 'express-validator';
import { validate } from '@util/validator';

// 소유권 발급
export const postVoucher = {
  validator: [
    body('username').trim().toLowerCase()
      .not().isEmpty().withMessage('아이디가 비어있어요.').bail(),
    body('vouchers').isArray({ min: 1 }).withMessage('발급할 소유권을 선택해주세요.'),
    body('vouchers.*.photocardId').isNumeric().withMessage('포토카드ID는 숫자여야 해요.').bail(),
    body('vouchers.*.amount')
      .isNumeric().withMessage('발급할 소유권의 수량은 숫자여야 해요.').bail()
      .custom((value, { req }) => Number(value) > 0 && Number(value) < 100).withMessage('발급할 소유권의 수량은 1개부터 99개까지 입력할 수 있어요.').bail(),
    validate
  ],
  controller: async (req: Request, res: Response) => {
    console.log(req.body);
    
    return res.status(501).json({ message: 'Not Implemented' });
  }
}