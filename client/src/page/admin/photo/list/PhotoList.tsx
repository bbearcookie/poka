import React from 'react';
import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType, getErrorMessage, BACKEND } from '@util/commonAPI';
import * as queryKey from '@util/queryKey';
import * as photoAPI from '@api/photoAPI';
import PhotoCard from '@component/card/PhotoCard';

interface PhotoListProps {
  children?: React.ReactNode;
}
const PhotoListDefaultProps = {};

function PhotoList({ children }: PhotoListProps & typeof PhotoListDefaultProps) {
  const { status, data: photos, error } =
  useQuery<AxiosResponse<typeof photoAPI.getAllPhotoList.resType>, AxiosError<ErrorType>>
  (queryKey.photoKeys.all, photoAPI.getAllPhotoList.axios);

  return (
    <section className="photo-section">
      {photos?.data?.photos.map((item) => (
        <PhotoCard key={item.photocard_id} photo={item} />
      ))}
    </section>
  );
}

PhotoList.defaultProps = PhotoListDefaultProps;
export default PhotoList;