import jwt from 'jsonwebtoken';

// 토큰에 들어갈 페이로드 타입
type PayloadType = {
  username: string;
  nickname: string;
  role: string;
  strategy: string;
}

// 액세스 토큰 타입
type TokenType = PayloadType & {
  iat: number;
  exp: number;
}

// 로그인 토큰 생성
export function createLoginToken(payload: PayloadType) {
  if (!process.env.TOKEN_SECRET_KEY) throw new Error("TOKEN_SECRET_KEY is undefined");
  if (!process.env.ACCESS_TOKEN_EXPIRES) throw new Error("ACCESS_TOKEN_EXPIRES is undefined");

  return jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES
  });
}

// 토큰 검증
export function verifyToken(token: string) {
  if (!process.env.TOKEN_SECRET_KEY) throw new Error("TOKEN_SECRET_KEY is undefined");
  if (!token) throw new Error("Token is missing");

  return jwt.verify(token, process.env.TOKEN_SECRET_KEY) as TokenType;
}