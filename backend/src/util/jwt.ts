import jwt from 'jsonwebtoken';

// 토큰에 들어갈 페이로드 타입
export type UserType = {
  user_id: number;
  username: string;
  role: string;
  strategy: string;
}

// 액세스 토큰 타입
export type TokenType = UserType & {
  iat: number;
  exp: number;
}

// 로그인 토큰 생성
export function createLoginToken(payload: UserType) {
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
    const payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY) as TokenType;
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