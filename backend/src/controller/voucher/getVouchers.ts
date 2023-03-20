import { NextFunction, Request, Response } from 'express';
import { query } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { filterSanitizer } from '@validator/chain/filter';
import { selectVouchers } from '@service/voucher/select';

export type FilterType = {
  photoNames: string[];
  userNames: string[];
  groupIds: number[];
  memberIds: number[];
  excludeVoucherIds: number[];
  voucherState: 'all' | 'available' | 'trading' | 'shipping' | 'shipped';
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

  query('filter.photoNames')
    .isArray().withMessage('포토카드 이름 필터가 잘못되었어요.').bail(),
  query('filter.photoNames.*')
    .trim()
    .isString().withMessage('포토카드 이름은 문자열이어야 해요.').bail(),

  query('filter.userNames')
    .isArray().withMessage('사용자 아이디 필터가 잘못되었어요.').bail(),
  query('filter.userNames.*')
    .trim()
    .isString().withMessage('사용자 아이디는 문자열이어야 해요.').bail(),

  query('filter.groupIds')
    .isArray().withMessage('그룹 필터가 잘못되었어요.').bail(),
  query('filter.groupIds.*')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('그룹 ID는 숫자여야 해요.').bail(),

  query('filter.memberIds')
    .isArray().withMessage('멤버 필터가 잘못되었어요.').bail(),
  query('filter.memberIds.*')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('멤버 ID는 숫자여야 해요.').bail(),

  query('filter.excludeVoucherIds')
    .isArray().withMessage('제외 소유권 ID가 잘못되었어요.').bail(),
  query('filter.excludeVoucherIds.*')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('제외 소유권 ID는 숫자여야 해요.').bail(),

  query('filter.voucherState')
    .custom(v => ['all', 'available', 'trading', 'shipping', 'shipped'].includes(v)),
  
  validate
]

// 전체 소유권 목록 조회
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const itemPerPage = 20;
  const { pageParam, filter } = req.query as unknown as Query;

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