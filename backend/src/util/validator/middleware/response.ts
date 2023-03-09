import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { removeFile } from '@util/multer';

// validate-chain으로 등록된 유효성 검사 조건을 모두 수행하는 미들웨어
export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  
  // 유효성 에러 발견시 처리
  if (!errors.isEmpty()) {
     // 업로드 된 파일이 있다면 삭제
    if (req.file) removeFile(req.file);
    if (req.files) removeFile(req.files as Express.Multer.File[]);

    const result = Object.entries(errors.mapped()).map(([_, err]) => {
      return { param: err.param, message: err.msg }
    });

    // 단일 에러
    if (result.length === 1) {
      return res.status(400).json({
        message: result[0].message,
        errors: [{
          message: result[0].message,
          param: result[0].param
        }]
      });
    }

    // 다중 에러
    return res.status(400).json({ message: '올바른 정보를 입력해주세요!', errors: result });
  }

  next();
}