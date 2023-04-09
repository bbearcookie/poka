// 날짜 포맷을 일정하게 하기 위해 한자리의 값이면 앞에 0을 붙혀서 반환해주는 함수
function leftPad(value: number) {
  if (value >= 10) return `${value}`;
  return `0${value}`;
}

// 날짜를 yyyy-MM-dd 형태로 변환함
export function getYYYYMMDD(date: Date, delimiter = '-') {
  const year = date.getFullYear();
  const month = leftPad(date.getMonth() + 1);
  const day = leftPad(date.getDate());

  return [year, month, day].join(delimiter);
}

// date 타입의 값을 사람이 읽을 문자열 형태로 변환함
export function getFormattedTime(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const pmhour = hour - 12;
  const minute = date.getMinutes();

  return `${year}년 ${month}월 ${day}일
  ${hour < 12 ? '오전 ' + hour : '오후 ' + pmhour}시 ${minute}분`;
}

// date 타입 값을 년월을 포함한 문자열 형태로 반환함.
export function getYearMonth(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}년 ${month}월`;
}

// date 타입의 값을 년월일을 포함한 문자열 형태로 반환함.
export function getYearMonthDay(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

// 해당 date 값이 현재로부터 얼마나 이전인지를 문자열 형태로 변환함
export function getElaspedTime(date: Date) {
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000;

  const times = [
    { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
    { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
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