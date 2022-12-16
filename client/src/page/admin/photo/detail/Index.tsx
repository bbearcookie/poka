import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ErrorType } from '@util/request';
import { AxiosError } from 'axios';
import usePhotoQuery from '@api/query/photo/usePhotoQuery';
import * as photoAPI from '@api/photoAPI';
import * as queryKey from '@api/queryKey';
import BackLabel from '@component/label/BackLabel';
import Success from './Success';
import './Index.scss';

interface Props {}
const DefaultProps = {};

function PhotoDetailPage({  }: Props) {
  const { photocardId } = useParams() as any;
  const { status, data: photo, error } = usePhotoQuery(photocardId);
  
  return (
    <div className="PhotoDetailPage">
      <BackLabel to="/admin/photo/list" styles={{ marginBottom: "2em" }}>포토카드 목록</BackLabel>
      {status === 'success' && <Success photo={photo} photocardId={photocardId} />}
    </div>
  );
}

export default PhotoDetailPage;