import { client } from "@util/request";
import { ParamType as AddMemberParam } from '@api/mutation/member/useAddMember';
import { ParamType as ModifyGroupParam } from '@api/mutation/member/useModifyMember';
import { ParamType as DeleteGroupParam } from '@api/mutation/member/useDeleteMember';

export const fetchMembers = async () => {
  const url = `/api/member`;
  const res = await client.get(url);
  return res.data;
}

export const fetchMemberDetail = async (memberId: number) => {
  const url = `/api/member/${memberId}`;
  const res = await client.get(url);
  return res.data;
}

export const addMember = async (param: AddMemberParam) => {
  const url = `/api/group/${param.groupId}/member`;
  const res = await client.post(url, param.body);
  return res;
}

export const modifyMember = async (param: ModifyGroupParam) => {
  const url = `/api/member/${param.memberId}`;
  const res = await client.put(url, param.body);
  return res;
}

export const deleteMember = async (param: DeleteGroupParam) => {
  const url = `/api/member/${param.memberId}`;
  const res = await client.delete(url);
  return res;
}