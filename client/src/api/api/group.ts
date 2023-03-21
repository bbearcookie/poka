import { client } from "@util/request";

// 그룹 목록 조회
export const fetchGroups = async () => {
  const url = `/api/group`;
  const res = await client.get(url);
  return res.data;
}

// 그룹 상세 조회
export const fetchGroupDetail = async (groupId: number) => {
  const url = `/api/group/${groupId}`;
  const res = await client.get(url);
  return res.data;
}

// 그룹 추가
export const addGroup = async (body: object) => {
  const url = `/api/group`;
  const option = { headers: { 'Content-Type': 'multipart/form-data' } };
  const res = await client.post(url, body, option);
  return res;
}

// 그룹 수정
export const modifyGroup = async (groupId: number, body: object) => {
  const url = `/api/group/${groupId}`;
  const option = { headers: { 'Content-Type': 'multipart/form-data' } };
  const res = await client.put(url, body, option);
  return res;
}

// 그룹 삭제
export const deleteGroup = async (groupId: number) => {
  const url = `/api/group/${groupId}`;
  const res = await client.delete(url);
  return res;
}