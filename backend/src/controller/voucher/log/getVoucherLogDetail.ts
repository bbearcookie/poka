import { NextFunction, Request, Response } from 'express';
import { query, param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isAdmin } from '@validator/middleware/auth';
import { selectVoucherDetail } from '@service/voucher/select';
import { selectVoucherLogDetail } from '@service/voucher/log/select';

interface Params {
  voucherId: number;
}

interface Query {
  pageParam: number;
}

export const validator = [
  isAdmin,
  param('voucherId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('소유권 ID는 숫자여야 해요.'),
  query('pageParam')
    .default(0)
    .isNumeric().withMessage('pageParam이 숫자가 아니에요').bail(),
  validate
]

// 소유권 기록 조회
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { voucherId } = req.params as unknown as Params;
  const itemPerPage = 5;
  const { pageParam } = req.query as unknown as Query;

  const [[voucher]] = await selectVoucherDetail(voucherId);
  if (!voucher) return res.status(404).json({ message: '해당 소유권의 데이터가 서버에 존재하지 않아요.' });

  const [logs] = await selectVoucherLogDetail(voucherId, itemPerPage, pageParam);
  return res.status(200).json({
    message: '소유권의 기록을 조회했어요.',
    logs,
    paging: {
      pageParam,
      hasNextPage: logs.length === itemPerPage
    }
  });
  
  next();
}