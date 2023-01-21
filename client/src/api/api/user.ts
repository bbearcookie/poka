import { client } from '@util/request';
import { ParamType as ModifyUserProfileParam } from '@api/mutation/user/useModifyUserProfile';

export const fetchUserDetail = async (userId: number) => {
  const url = `/api/user/${userId}`;
  const res = await client.get(url);
  return res.data;
}

export const modifyUserProfile = async (param: ModifyUserProfileParam) => {
  const url = `/api/user/${param.userId}/profile`;
  const option = { headers: { 'Content-Type': 'multipart/form-data' } };
  const res = await client.put(url, param.body, option);
  return res;
}