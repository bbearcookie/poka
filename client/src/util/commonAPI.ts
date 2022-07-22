import { AxiosError } from "axios";

export const BACKEND = 'http://localhost:5000';
export const options = { withCredentials: true }; // 여러 API 요청들이 공통적으로 사용할만한 옵션

// 서버에서 유효성 검사 실패하면 반환되는 에러 내용 타입
export type ErrorType<T = void> = {
  message: string;
  errors: {
    param: keyof T;
    message: string;
  }[]
};

// 에러 메시지를 반환하는 함수
export function getErrorMessage<T>(err: AxiosError<ErrorType<T>>) {
  if (err.response?.data?.message) return err.response?.data?.message;
  else return err.message;
}