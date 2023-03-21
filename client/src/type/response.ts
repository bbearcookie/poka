// 단일 에러
export interface SingleError<ParamType = string> {
  message: string;
  param: ParamType;
}

// 서버로부터 받아온 에러 타입
export interface ResponseError<ParamType = string> {
  message: string;
  errors: SingleError<ParamType>[];
}