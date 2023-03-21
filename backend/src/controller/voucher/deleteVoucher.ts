import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isAdmin } from '@validator/middleware/auth';
import { selectVoucherDetail } from '@service/voucher/select';
import { deleteVoucher as deleteVoucherService } from '@service/voucher/delete';

interface Params {
  voucherId: number;
}

const validator = [
  isAdmin,
  param('voucherId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('소유권 ID는 숫자여야 해요.'),
  validate
]

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { voucherId } = req.params as unknown as Params;

  const [[voucher]] = await selectVoucherDetail(voucherId);
  if (!voucher) return res.status(404).json({ message: '해당 소유권의 데이터가 서버에 존재하지 않아요.' });

  await deleteVoucherService(voucherId);
  return res.status(200).json({ message: `${voucher.owner.username} 회원의 ${voucher.photo.name} 소유권을 삭제했어요.` });
  next();
}

// 소유권 삭제
const deleteVoucher = [
  ...validator,
  controller
];

export default deleteVoucher;