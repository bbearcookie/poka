import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { selectVoucherDetail } from '@service/voucher/select';

interface Params {
  voucherId: number;
}

export const validator = [
  param('voucherId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('소유권 ID는 숫자여야 해요.'),
  validate
]

// 소유권 상세 조회
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { voucherId } = req.params as unknown as Params;

  const [[voucher]] = await selectVoucherDetail(voucherId);
  if (!voucher) return res.status(404).json({ message: '해당 소유권의 데이터가 서버에 존재하지 않아요.' });

  return res.status(200).json({
    message: `${voucherId}번 소유권의 상세 정보를 조회했습니다.`,
    ...voucher
  });
  next();
}