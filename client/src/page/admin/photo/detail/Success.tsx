import React, { useState, useCallback } from 'react';
import { AxiosResponse } from 'axios';
import { BACKEND } from '@util/commonAPI';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import * as photoAPI from '@api/photoAPI';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import Button from '@component/form/Button';
import PhotoInfo from './PhotoInfo';
import PhotoEditor from './PhotoEditor';
import PhotoRemove from './PhotoRemove';

interface SuccessProps {
  photo: AxiosResponse<typeof photoAPI.getPhotoDetail.resType>;
  photocardId: number;
  children?: React.ReactNode;
}
const SuccessDefaultProps = {};

function Success({ photo, photocardId, children }: SuccessProps & typeof SuccessDefaultProps) {
  const [editMode, setEditMode] = useState(false);

  // 편집 모드 ON / OFF
  const startEditor = useCallback(() => setEditMode(true), []);
  const closeEditor = useCallback(() => setEditMode(false), []);

  return (
    <>
      {editMode ?
        <PhotoEditor photo={photo} photocardId={photocardId} closeEditor={closeEditor} /> :
        <PhotoInfo photo={photo} startEditor={startEditor} />
      }
      <PhotoRemove photo={photo} photocardId={photocardId} />
    </>
  );
}

Success.defaultProps = SuccessDefaultProps;
export default Success;