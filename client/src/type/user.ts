export type Role = 'admin' | 'user';

export const RoleText: {
  [k in Role]: string;
} = {
  user: '회원',
  admin: '관리자',
};

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
