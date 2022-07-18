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

export const getGroupDetail = {
  axios: (groupId: number) => () => axios({
    ...options,
    method: 'get',
    url: `${BACKEND}/api/group/${groupId}`
  }),
  resType: undefined as undefined | {
    message: string;
    group_id: number;
    name: string;
    image_name: string;
    members: {
      group_id: number;
      member_id: number;
      name: string;
      photo_cnt: number;
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

export const putGroup = {
  axios: (data: { groupId: number; [key: string]: any }) => axios({
    ...options,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'put',
    url: `${BACKEND}/api/group/${data.groupId}`,
    data
  }),
  resType: undefined as undefined | {
    message: string;
  }
}