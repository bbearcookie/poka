import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isAdmin } from '@validator/middleware/auth';
import { createResponseMessage } from '@validator/function/response';
import { selectUser } from '@service/user/select';
import { insertVouchers } from '@service/voucher/insert';

interface Body {
  username: string;
  vouchers: {
    photocardId: number;
    amount: number;
  }[];
}

const validator = [
  isAdmin,
  body('username')
    .trim().toLowerCase()
    .not().isEmpty().withMessage('아이디가 비어있어요.').bail(),
  body('vouchers')
    .isArray({ min: 1 }).withMessage('발급할 소유권을 선택해주세요.'),
  body('vouchers.*.photocardId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('포토카드ID는 숫자여야 해요.').bail(),
  body('vouchers.*.amount')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('발급할 소유권의 수량은 숫자여야 해요.').bail()
    .custom(v => Number(v) > 0 && Number(v) < 10).withMessage('발급할 소유권의 수량은 1개부터 9개까지 입력할 수 있어요.').bail(),
  validate
]

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { username, vouchers } = req.body as Body;

  const [[user]] = await selectUser(username);
  if (!user) return res.status(404).json(createResponseMessage("username", "가입되지 않은 사용자에요."));

  await insertVouchers(user.userId, vouchers);
  return res.status(200).json({ message: `${user.username} 사용자에게 소유권을 발급했어요.` });
  next();
}

// 소유권 발급
const postVoucher = [
  ...validator,
  controller
];

export default postVoucher;