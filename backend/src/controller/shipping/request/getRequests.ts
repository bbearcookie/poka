import { NextFunction, Request, Response } from 'express';
import { query } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { filterSanitizer } from '@validator/chain/filter';
import { havePageParam } from '@validator/chain/page';
import { selectShippingRequests } from '@service/shipping/request/select';

export type FilterType = {
  userName: string[];
  shippingState: 'all' | 'waiting' | 'shipped';
  paymentState: 'all' | 'waiting' | 'paid' | 'forgeried';
}

export const validator = [
  ...havePageParam,
  ...filterSanitizer,
  query('filter.userName').isArray().withMessage('검색 필터가 잘못되었어요.').bail(),
  query('filter.shippingState')
    .custom((value) => ['all', 'waiting', 'shipped'].includes(value))
    .withMessage('검색 필터가 잘못되었어요.').bail(),
  query('filter.paymentState')
    .custom((value) => ['all', 'waiting', 'paid', 'forgeried'].includes(value))
    .withMessage('검색 필터가 잘못되었어요.').bail(),
  validate
]

// 배송 요청 목록 조회
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const itemPerPage = 10;
  const pageParam = req.query.pageParam ? Number(req.query.pageParam) : 0;
  const filter = req.query.filter as unknown as FilterType;

  const [shippings] = await selectShippingRequests(itemPerPage, pageParam, filter);

  return res.status(200).json({
    message: '배송 요청 목록을 조회했어요.',
    shippings,
    paging: {
      pageParam,
      hasNextPage: shippings.length === itemPerPage
    }
  });
  next();
}