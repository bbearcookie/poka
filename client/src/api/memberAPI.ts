import axios from "axios";
import { BACKEND, options } from "@util/commonAPI";

export const getMembersOfGroup = {
  axios: (groupId: number) => () => axios({
    ...options,
    method: 'get',
    url: `${BACKEND}/api/group/${groupId}/member`
  }),
  resType: undefined as undefined | {
    message: string;
    members: {
      group_id: number;
      member_id: number;
      name: string;
      photo_cnt: number;
    }[];
  }
}

export const postMember = {
  axios: (data: object) => axios({
    ...options,
    method: 'post',
    url: `${BACKEND}/api/member`,
    data
  }),
  resType: undefined as undefined | {
    message: string;
    memberId: number;
  }
}

export const putMember = {
  axios: (data: { memberId: number; [key: string]: any }) => axios({
    ...options,
    method: 'put',
    url: `${BACKEND}/api/member/${data.memberId}`,
    data
  }),
  resType: undefined as undefined | {
    message: string;
  }
}