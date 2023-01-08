// date 타입의 값을 사람이 읽을 문자열 형태로 변환함
export function getFormattedTime(datetime: string) {
  const date = new Date(datetime);

  return `
  ${date.getFullYear()}-${date.getMonth()}-${date.getDate()}
  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

// 해당 date 값이 현재로부터 얼마나 이전인지를 문자열 형태로 변환함
export function getElaspedTime(datetime: string) {
  const date = new Date(datetime);
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000;

  const times = [
    { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
    { name: '월', milliSeconds: 60 * 60 * 24 * 30 },
    { name: '일', milliSeconds: 60 * 60 * 24 },
    { name: '시간', milliSeconds: 60 * 60 },
    { name: '분', milliSeconds: 60 }
  ]

  for (const time of times) {
    const between = Math.floor(diff / time.milliSeconds);
    if (between > 0) return `${between}${time.name} 전`;
  }
  return `방금 전`;

}