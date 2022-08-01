import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ErrorType } from '@util/commonAPI';
import { AxiosError, AxiosResponse } from 'axios';
import * as photoAPI from '@api/photoAPI';
import * as queryKey from '@util/queryKey';
import BackLabel from '@component/label/BackLabel';
import Success from './Success';
import './Index.scss';

interface PhotoDetailPageProps {
  children?: React.ReactNode;
}
const PhotoDetailPageDefaultProps = {};

function PhotoDetailPage({ children }: PhotoDetailPageProps & typeof PhotoDetailPageDefaultProps) {
  const { photocardId } = useParams() as any;
  const { status, data: photo, error } = 
  useQuery<AxiosResponse<typeof photoAPI.getPhotoDetail.resType>, AxiosError<ErrorType>>
  (queryKey.photoKeys.detail(photocardId), photoAPI.getPhotoDetail.axios(photocardId));
  
  return (
    <div className="PhotoDetailPage">
      <BackLabel to="/admin/photo/list" styles={{ marginBottom: "2em" }}>포토카드 목록</BackLabel>
      {status === 'success' && <Success photo={photo} photocardId={photocardId} />}
    </div>
  );
}

PhotoDetailPage.defaultProps = PhotoDetailPageDefaultProps;
export default PhotoDetailPage;