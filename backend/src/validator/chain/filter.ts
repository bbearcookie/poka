import { query } from 'express-validator';

// 검색 조건에 사용되는 filter 파라미터를 JSON 형태로 변환함
export const filterSanitizer = [
  query('filter').customSanitizer((value) => {
    try { return JSON.parse(value); }
    catch (err) { return undefined; }
  }),
]