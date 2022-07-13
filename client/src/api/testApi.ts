import axios, { AxiosPromise } from "axios";
import { BACKEND, options } from "@util/commonAPI";

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