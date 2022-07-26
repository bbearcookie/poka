import axios from "axios";
import { BACKEND, options } from "@util/commonAPI";

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