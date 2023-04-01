import axios, { AxiosError } from 'axios';
import { ResponseError } from '@type/response';
import { BACKEND } from '@api/resource';

// 공통적으로 사용할만한 옵션이 적용된 axios 클라이언트
export const client = axios.create({
  baseURL: BACKEND,
  withCredentials: true,
});

// 에러 메시지를 반환하는 함수
export function getErrorMessage<ParamType>(err: AxiosError<ResponseError<ParamType>>) {
  if (err.response?.data?.message) return err.response?.data?.message;
  else return err.message;
}
