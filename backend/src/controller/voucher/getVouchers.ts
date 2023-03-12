import { NextFunction, Request, Response } from 'express';
import { query } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { havePageParam } from '@validator/chain/page';
import { filterSanitizer } from '@validator/chain/filter';
import { selectVouchers } from '@service/voucher/select';

export type FilterType = {
  photoName: string[];
  userName: string[];
  groupId: number[];
  memberId: number[];
  excludeVoucherId: number[];
  voucherState: 'all' | 'available' | 'trading' | 'shipping' | 'shipped';
}

export const validator = [
  ...havePageParam,
  ...filterSanitizer,
  query('filter.photoName').isArray().withMessage('검색 필터가 잘못되었어요.').bail(),
  query('filter.userName').isArray().withMessage('검색 필터가 잘못되었어요.').bail(),
  query('filter.groupId').isArray().withMessage('검색 필터가 잘못되었어요.').bail(),
  query('filter.memberId').isArray().withMessage('검색 필터가 잘못되었어요.').bail(),
  query('filter.excludeVoucherId').isArray().withMessage('검색 필터가 잘못되었어요.').bail(),
  query('filter.voucherState').custom((value) => ['all', 'available', 'trading', 'shipping', 'shipped'].includes(value)),
  validate
]

// 전체 소유권 목록 조회
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const itemPerPage = 20;
  const pageParam = req.query.pageParam ? Number(req.query.pageParam) : 0;
  const filter = req.query.filter as unknown as FilterType;

  const [vouchers] = await selectVouchers(itemPerPage, pageParam, filter);
  return res.status(200).json({
    message: '소유권 목록을 조회했습니다.',
    vouchers,
    paging: {
      pageParam,
      hasNextPage: vouchers.length === itemPerPage
    }
  });

  next();
}