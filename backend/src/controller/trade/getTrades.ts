import { NextFunction, Request, Response } from 'express';
import { query } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { JSONSanitizer } from '@validator/sanitizer/common';
import { selectTrades } from '@service/trade/select';

export type FilterType = {
  groupId: number;
  memberId: number;
  userId: number;
  excludeUserId: number;
  state: 'all' | 'trading' | 'traded';
};

interface Query {
  pageParam: number;
  filter: FilterType;
}

const validator = [
  query('pageParam')
    .default(0)
    .customSanitizer(v => Number(v))
    .isNumeric()
    .withMessage('pageParam이 숫자가 아니에요')
    .bail(),

  query('filter').customSanitizer(JSONSanitizer),

  query('filter.groupId')
    .default(0)
    .customSanitizer(v => Number(v))
    .isNumeric()
    .withMessage('검색 필터가 잘못되었어요.')
    .bail(),

  query('filter.memberId')
    .default(0)
    .customSanitizer(v => Number(v))
    .isNumeric()
    .withMessage('검색 필터가 잘못되었어요.')
    .bail(),

  query('filter.userId')
    .default(0)
    .customSanitizer(v => Number(v))
    .isNumeric()
    .withMessage('검색 필터가 잘못되었어요.')
    .bail(),

  query('filter.excludeUserId')
    .default(0)
    .customSanitizer(v => Number(v))
    .isNumeric()
    .withMessage('검색 필터가 잘못되었어요.')
    .bail(),

  query('filter.state')
    .default('')
    .trim()
    .isString()
    .withMessage('검색 필터가 잘못되었어요.')
    .bail(),

  validate,
];

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const itemPerPage = 10;
  const { pageParam, filter } = req.query as unknown as Query;

  const trades = await selectTrades(itemPerPage, pageParam, filter);

  return res.status(200).json({
    message: '거래글 목록을 조회했습니다.',
    trades,
    paging: {
      pageParam,
      hasNextPage: trades.length === itemPerPage,
    },
  });
  next();
};

// 교환글 목록 조회
const getTrades = [...validator, controller];

export default getTrades;
