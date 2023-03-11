import { query, oneOf } from 'express-validator';

// 페이징 기능에 사용되는 pageParam은 아예 없거나 숫자여야 한다.
export const havePageParam = [
  oneOf([
    query('pageParam').not().exists(),
    query('pageParam').isNumeric()
  ], '페이지 조건이 잘못되었어요.')
]