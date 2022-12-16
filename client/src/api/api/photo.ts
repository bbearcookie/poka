import { client } from "@util/request";
import { ParamType as PhotosParam } from "@api/query/photo/usePhotosQuery";
import { ParamType as AddPhotoParam } from "@api/mutation/photo/useAddPhotos";

export const fetchPhotos = async (param: PhotosParam) => {
  const url = `/api/photo`;
  const res = await client.get(url, { params: param });
  return res.data;
}

export const fetchPhotoDetail = async (photocardId: number) => {
  const url = `/api/photo/${photocardId}`;
  const res = await client.get(url);
  return res.data;
}

export const addPhotos = async (param: AddPhotoParam) => {
  const url = `/api/photo/multiple`;
  const option = { headers: { 'Content-Type': 'multipart/form-data' } };
  const res = await client.post(url, param.body, option);
  return res;
}