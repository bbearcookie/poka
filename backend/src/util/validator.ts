import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { verifyToken } from '@util/jwt';
import { LoginTokenType } from '@type/user';
import { removeFile } from './multer';
import jwt from 'jsonwebtoken';

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

// 로그인 정보를 req.user에 담는 함수
function checkLoggedIn(req: Request, res: Response) {
  const accessToken = req.cookies.accessToken;

  try {
    const payload = verifyToken(accessToken);
    req.user = payload;
  } catch (err) {
    throw err;
  }
}

// 관리자 권한을 확인하는 미들웨어
export function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    checkLoggedIn(req, res);
    const user = req.user as LoginTokenType;
    if (user.role !== 'admin') return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });
    next();
  } catch (err) {
    const error = (err as jwt.VerifyErrors);
    return res.status(400).json({ message: error.message });
  }
}

// 로그인 여부를 확인하는 미들웨어
export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  try {
    checkLoggedIn(req, res);
    next();
  } catch (err) {
    const error = (err as jwt.VerifyErrors);
    return res.status(400).json({ message: error.message });
  }
}

// 유효성 검사가 끝난 이후 컨트롤러 단에서 오류를 반환해줘야 할 때 사용하는 함수.
export function createResponseMessage(param: string, message: string) {
  return {
    message,
    errors: [{
      message,
      param
    }]
  };
}

// 관리자이거나, 로그인 한 사람이 리소스의 주인인지를 반환하는 함수
export function isAdminOrOwner(user: LoginTokenType, ownerUserId: number) {
  if (user.role === 'admin' || user.userId === ownerUserId) return true;
  return false;
}