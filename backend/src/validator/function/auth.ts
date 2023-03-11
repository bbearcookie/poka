import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { LoginTokenPayloadType, LoginTokenType } from '@type/user';

// 로그인 토큰 생성
export function createLoginToken(payload: LoginTokenPayloadType) {
  if (!process.env.TOKEN_SECRET_KEY) throw new Error("TOKEN_SECRET_KEY is undefined");
  if (!process.env.ACCESS_TOKEN_EXPIRES) throw new Error("ACCESS_TOKEN_EXPIRES is undefined");

  return jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES
  });
}

// 토큰 검증
export function verifyToken(token: string) {
  if (!process.env.TOKEN_SECRET_KEY) throw new Error("TOKEN_SECRET_KEY is undefined");
  if (!token) throw new Error("로그인 상태가 아니에요.");

  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY) as LoginTokenType;
    return payload;
  } catch (err) {
    const error = (err as jwt.VerifyErrors);

    switch (error.name) {
      case 'TokenExpiredError':
        throw new Error("로그인 토큰이 만료되었어요.");
      default:
        throw new Error(error.message);
    }
  }
}

// 로그인 정보를 req.user에 담는 함수
export function checkLoggedIn(req: Request, res: Response) {
  const accessToken = req.cookies.accessToken;

  try {
    const payload = verifyToken(accessToken);
    req.user = payload;
  } catch (err) {
    throw err;
  }
}

// 관리자이거나, 로그인 한 사람이 리소스의 주인인지를 반환하는 함수
export function isAdminOrOwner(user: LoginTokenType, ownerUserId: number) {
  if (user.role === 'admin' || user.userId === ownerUserId) return true;
  return false;
}