export const BACKEND = 'http://localhost:5000';
export const options = { withCredentials: true }; // 여러 API 요청들이 공통적으로 사용할만한 옵션

// 서버에서 유효성 검사 실패하면 반환되는 에러 내용 타입
export interface ErrorsType<T> {
  errors: {
    param: keyof T;
    message: string;
  }[]
}