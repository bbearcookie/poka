import { client } from '@util/request';
import { ResType as VerifyResType } from '@api/mutation/auth/useVerify';
import { AxiosResponse } from 'axios';

// 회원가입
export const signup = async (body: object) => {
  const url = `/api/auth/signup`;
  const res = await client.post(url, body);
  return res;
}

// 로그인
export const login = async (body: object) => {
  const url = `/api/auth/login`;
  const res = await client.post(url, body);
  return res;
}

// 로그아웃
export const logout = async () => {
  const url = `/api/auth/logout`;
  const res = await client.post(url);
  return res;
}

// 로그인 토큰 검증
export const verify = async (): Promise<AxiosResponse<VerifyResType>> => {
  const url = `/api/auth/verify`;
  const res = await client.post(url);
  return res;
}