import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { checkLoggedIn } from '@util/validator/function/auth';
import { LoginTokenType } from '@type/user';

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