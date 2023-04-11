// 사용자 타입
export interface User {
  userId: number;
  username: string;
  nickname: string;
  imageName: string;
  role: 'admin' | 'user';
}

// 사용자의 암호 포함 상세 타입
export interface UserDetail extends User {
  password: string;
  salt: string;
  strategy: string;
  registeredTime: string;
}

// 로그인 토큰 타입
export interface LoginToken {
  userId: number;
  username: string;
  role: string;
  strategy: string;
  iat: number;
  exp: number;
}