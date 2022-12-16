import { client } from "@util/request";
import { ParamType as AddGroupParam } from "@api/mutation/group/useAddGroup";
import { ParamType as ModifyGroupParam } from "@api/mutation/group/useModifyGroup";
import { ParamType as DeleteGroupParam } from "@api/mutation/group/useDeleteGroup";

export const fetchGroups = async () => {
  const url = `/api/group`;
  const res = await client.get(url);
  return res.data;
}

export const fetchGroupDetail = async (groupId: number) => {
  const url = `/api/group/${groupId}`;
  const res = await client.get(url);
  return res.data;
}

export const addGroup = async (param: AddGroupParam) => {
  const url = `/api/group`;
  const option = { headers: { 'Content-Type': 'multipart/form-data' } };
  const res = await client.post(url, param.body, option);
  return res;
}

export const modifyGroup = async (param: ModifyGroupParam) => {
  const url = `/api/group/${param.groupId}`;
  const option = { headers: { 'Content-Type': 'multipart/form-data' } };
  const res = await client.put(url, param.body, option);
  return res;
}

export const deleteGroup = async (param: DeleteGroupParam) => {
  const url = `/api/group/${param.groupId}`;
  const res = await client.delete(url);
  return res;
}