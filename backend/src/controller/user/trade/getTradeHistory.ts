import { NextFunction, Request, Response } from 'express';
import { param, query } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isLoggedIn } from '@validator/middleware/auth';
import { JSONSanitizer } from '@validator/sanitizer/common';
import { isAdminOrOwner } from '@validator/function/auth';
import { LoginToken } from '@type/user';
import { selectUserTradeHistory } from '@service/trade/history/select';

export type FilterType = {
  startDate: Date,
  endDate: Date
}

interface Params {
  userId: number;
}

interface Query {
  pageParam: number;
  filter: FilterType;
}

const validator = [
  isLoggedIn,
  param('userId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('사용자 ID는 숫자여야 해요.'),
  query('pageParam')
    .default(0)
    .isNumeric().withMessage('pageParam이 숫자가 아니에요'),
  query('filter')
    .customSanitizer(JSONSanitizer),
  query('filter')
    .isObject().withMessage('검색 필터가 잘못되었어요.'),
  query('filter.startDate')
    .isISO8601().withMessage('시작일은 날짜 형태여야해요.').bail()
    .toDate(),
  query('filter.endDate')
    .isISO8601().withMessage('끝일은 날짜 형태여야해요.').bail()
    .toDate()
    .custom((v: Date) => v.setDate(v.getDate() + 1)),
  validate
]

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const itemPerPage = 20;
  const loggedUser = req.user as LoginToken;
  const { userId } = req.params as unknown as Params;
  const { pageParam, filter } = req.query as unknown as Query;

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

// 사용자의 교환 내역 조회
const getTradeHistory = [
  ...validator,
  controller
];

export default getTradeHistory;