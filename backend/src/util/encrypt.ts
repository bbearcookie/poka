import crypto from 'crypto';

// size*2 자리의 소문자 + 숫자 조합의 랜덤 스트링을 반환하는 함수.
export function makeSalt(size: number) {
  return crypto.randomBytes(size).toString('hex');
}

// salt값을 키로 하여 plaintText를 암호화한다.
export function encryptText(plainText: string, salt: string) {
  return crypto.pbkdf2Sync(plainText, salt, 51234, 32, 'sha512').toString('hex');
}