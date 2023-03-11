import { client } from "@util/request";
import { ParamType as PhotosParam } from "@api/query/photo/usePhotosQuery";
import { ParamType as AddPhotoParam } from "@api/mutation/photo/useAddPhotos";
import { ParamType as ModifyPhotoParam } from "@api/mutation/photo/useModifyPhoto";
import { ParamType as DeletePhotoParam } from "@api/mutation/photo/useDeletePhoto";

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
  const url = `/api/photo`;
  const option = { headers: { 'Content-Type': 'multipart/form-data' } };
  const res = await client.post(url, param.body, option);
  return res;
}

export const modifyPhoto = async (param: ModifyPhotoParam) => {
  const url = `/api/photo/${param.photocardId}`;
  const option = { headers: { 'Content-Type': 'multipart/form-data' } };
  const res = await client.put(url, param.body, option);
  return res;
}

export const deletePhoto = async (param: DeletePhotoParam) => {
  const url = `/api/photo/${param.photocardId}`;
  const res = await client.delete(url);
  return res;
}