import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// validate-chain으로 등록된 유효성 검사 조건을 모두 수행하는 미들웨어
export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  const result = Object.entries(errors.mapped()).map(([_, err]) => {
    return { param: err.param, message: err.msg }
  });

  if (!errors.isEmpty()) return res.status(400).json({ errors: result });
  next();
}