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