import { client } from '@util/request';
import { ParamType as SignupParam } from '@api/mutation/auth/useSignup';
import { ParamType as LoginParam } from '@api/mutation/auth/useLogin';

export const signup = async (param: SignupParam) => {
  const url = `/api/auth/signup`;
  const res = await client.post(url, param.body);
  return res;
}

export const login = async (param: LoginParam) => {
  const url = `/api/auth/login`;
  const res = await client.post(url, param.body);
  return res;
}

export const logout = async () => {
  const url = `/api/auth/logout`;
  const res = await client.post(url);
  return res;
}

export const verify = async () => {
  const url = `/api/auth/verify`;
  const res = await client.post(url);
  return res;
}