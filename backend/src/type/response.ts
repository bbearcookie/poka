// 단일 에러
export interface SingleError<ParamType = string> {
  message: string;
  param: ParamType;
}

// 최종적으로 클라이언트에 반환하는 에러 타입
export interface ResponseError<ParamType = string> {
  message: string;
  errors: SingleError<ParamType>[];
}