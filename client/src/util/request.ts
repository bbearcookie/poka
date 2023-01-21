import axios, { AxiosError } from "axios";
import { BACKEND } from "@api/resource";

// 공통적으로 사용할만한 옵션이 적용된 axios 클라이언트
export const client = axios.create({
  baseURL: BACKEND,
  withCredentials: true
});

// 서버에서 유효성 검사 실패하면 반환되는 에러 내용 타입
export type ErrorType<TParam = string> = {
  message: string;
  param?: TParam;
  errors: {
    message: string;
    param: TParam;
  }[]
};

// 에러 메시지를 반환하는 함수
export function getErrorMessage<TParam>(err: AxiosError<ErrorType<TParam>>) {
  if (err.response?.data?.message) return err.response?.data?.message;
  else return err.message;
}