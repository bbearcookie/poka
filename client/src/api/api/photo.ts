import { client } from '@util/request';

// 포토카드 목록 조회
export const fetchPhotos = async (params: object) => {
  const url = `/api/photo`;
  const res = await client.get(url, { params });
  return res.data;
}

// 포토카드 상세 조회
export const fetchPhotoDetail = async (photocardId: number) => {
  const url = `/api/photo/${photocardId}`;
  const res = await client.get(url);
  return res.data;
}

// 포토카드 추가
export const addPhotos = async (body: object) => {
  const url = `/api/photo`;
  const option = { headers: { 'Content-Type': 'multipart/form-data' } };
  const res = await client.post(url, body, option);
  return res;
}

// 포토카드 수정
export const modifyPhoto = async (photocardId: number, body: object) => {
  const url = `/api/photo/${photocardId}`;
  const option = { headers: { 'Content-Type': 'multipart/form-data' } };
  const res = await client.put(url, body, option);
  return res;
}

// 포토카드 삭제
export const deletePhoto = async (photocardId: number) => {
  const url = `/api/photo/${photocardId}`;
  const res = await client.delete(url);
  return res;
}