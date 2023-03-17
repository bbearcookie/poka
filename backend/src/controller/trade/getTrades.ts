import { NextFunction, Request, Response } from 'express';
import { query } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { havePageParam } from '@validator/chain/page';
import { filterSanitizer } from '@validator/chain/filter';
import { TradeState } from '@type/trade';
import { selectTrades } from '@service/trade/select';

export type FilterType = {
  groupId: number;
  memberId: number;
  excludeUserId: number;
  state: TradeState;
}

export const validator = [
  ...havePageParam,
  ...filterSanitizer,
  query('filter.groupId').isNumeric().withMessage('검색 필터가 잘못되었어요.').bail(),
  query('filter.memberId').isNumeric().withMessage('검색 필터가 잘못되었어요.').bail(),
  query('filter.excludeUserId').isNumeric().withMessage('검색 필터가 잘못되었어요.').bail(),
  validate
]

// 교환글 목록 조회
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const itemPerPage = 10;
  const pageParam = req.query.pageParam ? Number(req.query.pageParam) : 0;
  const filter = req.query.filter as unknown as FilterType;

  const trades = await selectTrades(itemPerPage, pageParam, filter);

  return res.status(200).json({
    message: '거래글 목록을 조회했습니다.',
    trades,
    paging: {
      pageParam,
      hasNextPage: trades.length === itemPerPage
    }
  });
  next();
}