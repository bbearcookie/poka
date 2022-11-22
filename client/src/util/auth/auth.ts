import { User } from './authSlice';
export const STORAGE_KEY_NAME = 'AUTH';

// 로컬 스토리지에 로그인 정보 저장
export function saveUser(user: User) {
  localStorage.setItem(STORAGE_KEY_NAME, JSON.stringify(user));
}

// 로컬 스토리지에서 로그인 정보 확인
export function getUser() {
  const user = localStorage.getItem(STORAGE_KEY_NAME);
  if (user) return JSON.parse(user) as User;
  else return undefined;
}

// 로컬 스토리지에서 로그인 정보 제거
export function removeUser() {
  localStorage.removeItem(STORAGE_KEY_NAME);
}