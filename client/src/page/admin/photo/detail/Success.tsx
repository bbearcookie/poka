import React, { useState, useCallback } from 'react';
import * as photoAPI from '@api/photoAPI';
import PhotoInfo from './PhotoInfo';
import PhotoEditor from './PhotoEditor';
import PhotoRemove from './PhotoRemove';

interface SuccessProps {
  photo: typeof photoAPI.getPhotoDetail.resType;
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
        photo && <PhotoInfo photo={photo} startEditor={startEditor} />
      }
      <PhotoRemove photo={photo} photocardId={photocardId} />
    </>
  );
}

Success.defaultProps = SuccessDefaultProps;
export default Success;