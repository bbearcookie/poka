import { client } from '@util/request';

// 멤버 목록 조회
export const fetchMembers = async () => {
  const url = `/api/member`;
  const res = await client.get(url);
  return res.data;
}

// 멤버 상세 조회
export const fetchMemberDetail = async (memberId: number) => {
  const url = `/api/member/${memberId}`;
  const res = await client.get(url);
  return res.data;
}

// 멤버 추가
export const addMember = async (groupId: number, body: object) => {
  const url = `/api/group/${groupId}/member`;
  const res = await client.post(url, body);
  return res;
}

// 멤버 수정
export const modifyMember = async (memberId: number, body: object) => {
  const url = `/api/member/${memberId}`;
  const res = await client.put(url, body);
  return res;
}

// 멤버 삭제
export const deleteMember = async (memberId: number) => {
  const url = `/api/member/${memberId}`;
  const res = await client.delete(url);
  return res;
}