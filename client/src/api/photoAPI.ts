import axios from "axios";
import { BACKEND, options } from "@util/commonAPI";

export const getAllPhotoList = {
  axios: () => axios({
    ...options,
    method: 'get',
    url: `${BACKEND}/api/photo`
  }),
  resType: undefined as undefined | {
    message: string;
    photos: {
      photocard_id: number,
      member_id: number,
      group_id: number,
      name: string,
      group_name: string,
      member_name: string,
      image_name: string
    }[];
  }
}

export const getPhotoList = {
  axios: (limit: number, pageParam: number) => axios({
    ...options,
    method: 'get',
    url: `${BACKEND}/api/photo?limit=${limit}&pageParam=${pageParam}`
  }),
  resType: undefined as undefined | {
    message: string;
    pageParam: number;
    photos: {
      photocard_id: number,
      member_id: number,
      group_id: number,
      name: string,
      group_name: string,
      member_name: string,
      image_name: string
    }[];
  }
}

export const getPhotoDetail = {
  axios: (photocardId: number) => () => axios({
    ...options,
    method: 'get',
    url: `${BACKEND}/api/photo/${photocardId}`
  }),
  resType: undefined as undefined | {
    message: string;
    photocard_id: number;
    name: string;
    group_id: number;
    group_name: string;
    member_id: number;
    member_name: string;
    image_name: string;
  }
}

export const postPhotos = {
  axios: (data: object) => axios({
    ...options,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'post',
    url: `${BACKEND}/api/photo/multiple`,
    data
  }),
  resType: undefined as undefined | {
    message: string;
  }
}

export const putPhoto = {
  axios: (data: { photocardId: number; [key: string]: any }) => axios({
    ...options,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'put',
    url: `${BACKEND}/api/photo/${data.photocardId}`,
    data
  }),
  resType: undefined as undefined | {
    message: string;
  }
}

export const deletePhoto = {
  axios: (photocardId: number) => axios({
    ...options,
    method: 'delete',
    url: `${BACKEND}/api/photo/${photocardId}`
  }),
  resType: undefined as undefined | {
    message: string;
  }
}