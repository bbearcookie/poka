// 파일의 mimetype에 따른 확장자를 반환하는 함수
export function getExtension(mimetype: string) {
  if (mimetype === 'image/jpeg') return 'jpg';
  if (mimetype === 'image/png') return 'png';

  return '';
}

// (파일 이름_timestamp.확장자) 문자열을 반환하는 함수
export function getTimestampFilename(filename: string, mimetype: string) {
  return `${filename}_${Date.now()}.${getExtension(mimetype)}`;
}
