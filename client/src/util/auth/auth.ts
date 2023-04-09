import { LoginToken } from '@type/user';

const STORAGE_KEY = 'AUTH';

// 로컬 스토리지에 로그인 정보 저장
export function saveUserToStorage(user: LoginToken) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

// 로컬 스토리지에서 로그인 정보 확인
export function getUserFromStorage() {
  const user = localStorage.getItem(STORAGE_KEY);
  if (user) return JSON.parse(user) as LoginToken;
  else return undefined;
}

// 로컬 스토리지에서 로그인 정보 제거
export function removeUserFromStorage() {
  localStorage.removeItem(STORAGE_KEY);
}