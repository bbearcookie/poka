import axios, { AxiosPromise } from "axios";

const BACKEND = 'http://localhost:5000';
const options = { withCredentials: true }; // 여러 API 요청들이 공통적으로 사용할만한 옵션

export const getTestOne = () => axios({
  ...options,
  method: 'get',
  url: `${BACKEND}/api/test/one`,
});

export const getAllList = <T>(): AxiosPromise<T> => axios({
  ...options,
  method: 'get',
  url: `${BACKEND}/api/test/data/list`,
});

export const postTestData = (data: object) => axios({
  ...options,
  method: 'post',
  url: `${BACKEND}/api/test/data`,
  data
});