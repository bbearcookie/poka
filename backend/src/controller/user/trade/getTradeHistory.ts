import { NextFunction, Request, Response } from 'express';
import { param, query } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isLoggedIn } from '@validator/middleware/auth';
import { havePageParam } from '@validator/chain/page';
import { isAdminOrOwner } from '@validator/function/auth';
import { LoginTokenType } from '@type/user';
import { selectUserTradeHistory } from '@service/trade/history/select';

export type FilterType = {
  startDate: Date,
  endDate: Date
} 

export const validator = [
  isLoggedIn,
  ...havePageParam,
  param('userId').isNumeric().withMessage('사용자 ID는 숫자여야 해요.').bail(),
  query('filter').customSanitizer((value) => {
    try { return JSON.parse(value); }
    catch (err) { return undefined; }
  }),
  query('filter').isObject().withMessage('검색 필터가 잘못되었어요.').bail(),
  query('filter.startDate').isISO8601().toDate().withMessage('시작일은 날짜 형태여야해요.'),
  query('filter.endDate').isISO8601().toDate().withMessage('끝일은 날짜 형태여야해요.'),
  validate
]

// 사용자의 교환 내역 조회
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const itemPerPage = 20;
  const loggedUser = req.user as LoginTokenType;
  const userId = Number(req.params.userId);
  const pageParam = req.query.pageParam ? Number(req.query.pageParam) : 0;
  const filter = req.query.filter as unknown as FilterType;

  // 관리자이거나, 자기 자신의 정보에 대한 경우에만 접근 가능
  if (!isAdminOrOwner(loggedUser, userId)) return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });

  const [histories] = await selectUserTradeHistory(itemPerPage, pageParam, userId, filter);

  return res.status(200).json({
    message: '교환 내역을 조회했습니다.',
    histories,
    paging: {
      pageParam,
      hasNextPage: histories.length === itemPerPage
    }
  });

  next();
}