import { NextFunction, Request, Response } from 'express';

const controller = async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('accessToken');
  return res.status(200).json({ message: "로그아웃 완료" });
  next();
}

// 로그아웃
const logout = [
  controller
];

export default logout;