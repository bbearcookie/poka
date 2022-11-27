// date 타입의 값을 사람이 읽을 문자열 형태로 변환함
export function getFormattedTime(datetime: string) {
  const date = new Date(datetime);

  return `
  ${date.getFullYear()}-${date.getMonth()}-${date.getDate()}
  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}