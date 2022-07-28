import { Request, Response, NextFunction } from 'express';
import fs from 'fs/promises';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv'; dotenv.config(); // env 변수 사용

// 유효성 검사 실패시 업로드 된 임시 파일을 삭제하기 위한 함수
function removeFiles(req: Request) {
  const remove = (file: Express.Multer.File) => {
    try { fs.rm(file.path) }
    catch (err) { console.error(err); }
  }

  if (req.file) remove(req.file);

  const files = req.files as Express.Multer.File[];
  if (files) {
    files.forEach((file) => {
      remove(file);
    })
  }
}

// validate-chain으로 등록된 유효성 검사 조건을 모두 수행하는 미들웨어
export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    removeFiles(req); // 업로드 된 파일이 있다면 삭제

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