import { client } from '@util/request';

// 사용자 상세 조회
export const fetchUserDetail = async (userId: number) => {
  const url = `/api/user/${userId}`;
  const res = await client.get(url);
  return res.data;
}

// 사용자 프로필 수정
export const modifyUserProfile = async (userId: number, body: object) => {
  const url = `/api/user/${userId}/profile`;
  const option = { headers: { 'Content-Type': 'multipart/form-data' } };
  const res = await client.put(url, body, option);
  return res;
}