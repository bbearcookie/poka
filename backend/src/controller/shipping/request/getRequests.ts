import { NextFunction, Request, Response } from 'express';
import { query } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { filterSanitizer } from '@validator/chain/filter';
import { selectShippingRequests } from '@service/shipping/request/select';

export type FilterType = {
  userNames: string[];
  shippingState: 'all' | 'waiting' | 'shipped';
  paymentState: 'all' | 'waiting' | 'paid' | 'forgeried';
}

interface Query {
  pageParam: number;
  filter: FilterType;
}

export const validator = [
  ...filterSanitizer,

  query('pageParam')
    .default(0)
    .isNumeric().withMessage('pageParam이 숫자가 아니에요').bail(),

  query('filter.userNames')
    .isArray().withMessage('사용자 아이디 필터가 잘못되었어요.').bail(),
  query('filter.userNames.*')
    .trim()
    .isString().withMessage('사용자 아이디는 문자열이어야 해요.').bail(),

  query('filter.shippingState')
    .custom(v => ['all', 'waiting', 'shipped'].includes(v))
    .withMessage('배송 상태 필터가 잘못되었어요.').bail(),

  query('filter.paymentState')
    .custom(v => ['all', 'waiting', 'paid', 'forgeried'].includes(v))
    .withMessage('결제 상태 필터가 잘못되었어요.').bail(),

  validate
]

// 배송 요청 목록 조회
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const itemPerPage = 20;
  const { pageParam, filter } = req.query as unknown as Query;

  const shippings = await selectShippingRequests(itemPerPage, pageParam, filter);

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