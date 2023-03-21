import { CustomSanitizer } from 'express-validator';

// JSON 객체를 파싱된 상태로 만드는 Sanitizer
export const JSONSanitizer: CustomSanitizer = value => {
  try {
    return JSON.parse(value);
  } catch (err) {
    return undefined;
  }
}