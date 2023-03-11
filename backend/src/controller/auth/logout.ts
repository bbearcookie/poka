import { NextFunction, Request, Response } from 'express';

// 로그아웃
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('accessToken');
  return res.status(200).json({ message: "로그아웃 완료" });
  next();
}