import crypto from 'crypto';

// 32자리의 소문자 + 숫자 조합의 랜덤 스트링을 반환하는 함수. 주로 암호화 키의 생성에 사용된다.
export function makeSalt() {
  return crypto.randomBytes(32).toString('hex');
}

// salt값을 키로 하여 plaintText를 암호화한다.
export function encryptText(plainText: string, salt: string) {
  return crypto.pbkdf2Sync(plainText, salt, 51234, 32, 'sha512').toString('hex');
}