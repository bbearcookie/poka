// 유효성 검사가 끝난 이후 컨트롤러 단에서 오류를 반환해줘야 할 때 사용하는 함수.
export function createResponseMessage(param: string, message: string) {
  return {
    message,
    errors: [{
      message,
      param
    }]
  };
}