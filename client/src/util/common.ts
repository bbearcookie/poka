// date 타입의 값을 사람이 읽을 문자열 형태로 변환함
export function getFormattedTime(datetime: string) {
  const date = new Date(datetime);

  return `
  ${date.getFullYear()}-${date.getMonth()}-${date.getDate()}
  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

// 해당 date 값이 현재로부터 얼마나 이전인지를 문자열 형태로 변환함
export function getSimpleTakenTime(datetime: string) {
  const date = new Date(datetime);
  const now = new Date(Date.now());
  const diff = {
    year: now.getFullYear() - date.getFullYear(),
    month: now.getMonth() - date.getMonth(), 
    day: now.getDay() - date.getDay(),
    hours: now.getHours() - date.getHours(),
    minutes: now.getMinutes() - date.getMinutes(),
    seconds: now.getSeconds() - date.getSeconds()
  }

  if (diff.year > 0)
    return `${diff.year}년 전`;
  else if (diff.month > 0)
    return `${diff.month}달 전`;
  else if (diff.day > 0)
    return `${diff.day}일 전`;
  else if (diff.hours > 0)
    return `${diff.hours}시간 전`;
  else if (diff.minutes > 0)
    return `${diff.minutes}분 전`;
  else if (diff.seconds > 0)
    return `${diff.seconds}초 전`;
  else
    return `방금 전`;

}