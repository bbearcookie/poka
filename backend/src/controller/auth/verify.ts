import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '@validator/function/auth';

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;

  try {
    const payload = verifyToken(accessToken);
    return res.status(200).json({ message: '로그인 인증 성공', user: payload });
  } catch (err) {
    return res.status(401).json({ message: '로그인 인증 실패' });
  }

  next();
}

// 로그인 토큰 검증
const verify = [
  controller
];

export default verify;