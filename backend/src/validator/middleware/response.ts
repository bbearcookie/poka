import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { SingleError } from '@type/response';

// validate-chain으로 등록된 유효성 검사 조건을 모두 수행하는 미들웨어
export function validate(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req);

  // 유효성 에러 발견시 처리
  if (!result.isEmpty()) {
    const errors: SingleError[] = Object.values(result.mapped()).map(err => ({
      message: err.msg,
      param: err.param
    }));

    const message = (errors.length === 1) ? errors[0].message : '올바른 정보를 입력해주세요!';
    return res.status(400).json({ message, errors });
  }

  next();
}