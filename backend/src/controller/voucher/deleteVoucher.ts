import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isAdmin } from '@validator/middleware/auth';
import { selectVoucherDetail } from '@service/voucher/select';
import { deleteVoucher } from '@service/voucher/delete';

interface Params {
  voucherId: number;
}

export const validator = [
  isAdmin,
  param('voucherId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('소유권 ID는 숫자여야 해요.'),
  validate
]

// 소유권 삭제
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { voucherId } = req.params as unknown as Params;

  const [[voucher]] = await selectVoucherDetail(voucherId);
  if (!voucher) return res.status(404).json({ message: '해당 소유권의 데이터가 서버에 존재하지 않아요.' });

  await deleteVoucher(voucherId);
  return res.status(200).json({ message: `${voucher.owner.username} 회원의 ${voucher.photo.name} 소유권을 삭제했어요.` });
  next();
}