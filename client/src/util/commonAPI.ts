import axios, { AxiosError } from "axios";

export const BACKEND = 'http://localhost:5000';
export const options = { withCredentials: true }; // 여러 API 요청들이 공통적으로 사용할만한 옵션

// 공통적으로 사용할만한 옵션이 적용된 axios 클라이언트
export const client = axios.create({
  baseURL: BACKEND,
  withCredentials: true
});

// 서버에서 유효성 검사 실패하면 반환되는 에러 내용 타입
export type ErrorType<T = string> = {
  message: string;
  param?: T;
  errors: {
    message: string;
    param: T;
  }[]
};

// 에러 메시지를 반환하는 함수
export function getErrorMessage<T>(err: AxiosError<ErrorType<T>>) {
  if (err.response?.data?.message) return err.response?.data?.message;
  else return err.message;
}