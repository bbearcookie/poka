import axios from "axios";
import { BACKEND, options } from "@util/commonAPI";

export const postGroup = (data: object) => axios({
  ...options,
  headers: { 'Content-Type': 'multipart/form-data' },
  method: 'post',
  url: `${BACKEND}/api/group`,
  data
});

