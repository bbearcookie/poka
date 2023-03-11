import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isAdmin } from '@validator/middleware/auth';
import { havePageParam } from '@validator/chain/page';
import { selectVoucherDetail } from '@service/voucher/select';
import { selectVoucherLogDetail } from '@service/voucher/log/select';

export const validator = [
  isAdmin,
  ...havePageParam,
  param('voucherId').isNumeric().withMessage('소유권 ID는 숫자여야 해요.'),
  validate
]

// 소유권 기록 조회
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const voucherId = Number(req.params.voucherId);
  const itemPerPage = 5; // 페이지당 보여줄 내용 갯수
  const pageParam = req.query.pageParam ? Number(req.query.pageParam) : 0; // 페이지 번호

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