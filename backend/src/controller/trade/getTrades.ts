import { NextFunction, Request, Response } from 'express';
import { query } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { havePageParam } from '@validator/chain/page';
import { TradeStateType } from '@type/trade';
import { selectTrades } from '@service/trade/select';

export type FilterType = {
  groupId: number;
  memberId: number;
  excludeUserId: number;
  state: TradeStateType;
}

export const validator = [
  ...havePageParam,
  query('filter').custom(value => {
    const filter = JSON.parse(value);
    if (isNaN(filter.groupId)) return false;
    if (isNaN(filter.memberId)) return false;
    if (isNaN(filter.excludeUserId)) return false;
    return true;
  }).withMessage("검색 필터가 잘못되었어요."),
  validate
]

// 교환글 목록 조회
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const itemPerPage = 10;
  const pageParam = req.query.pageParam ? Number(req.query.pageParam) : 0;
  const filter = JSON.parse(String(req.query.filter)) as FilterType;

  const trades = await selectTrades(filter.groupId, filter.memberId, filter.excludeUserId, filter.state, itemPerPage, pageParam);
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