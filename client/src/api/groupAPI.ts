import axios from "axios";
import { BACKEND, options } from "@util/commonAPI";

export const getAllGroupList = {
  axios: () => axios({
    ...options,
    method: 'get',
    url: `${BACKEND}/api/group`
  }),
  resType: undefined as undefined | {
    message: string;
    groups: {
      group_id: number;
      name: string;
      image_name: string;
      member_cnt: number;
    }[];
  }
}

export const postGroup = {
  axios: (data: object) => axios({
    ...options,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'post',
    url: `${BACKEND}/api/group`,
    data
  }),
  resType: undefined as undefined | {
    message: string;
  }
}