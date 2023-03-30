import React, { useState, useCallback } from 'react';
import { ResType as PhotoResType } from '@api/query/photo/usePhotoQuery';
import PhotoInfo from './content/PhotoInfo';
import PhotoEditor from './content/editor/PhotoEditor';
import PhotoRemove from './content/PhotoRemove';

interface Props {
  photo: PhotoResType;
  photocardId: number;
}

function Success({ photo, photocardId }: Props) {
  const [editMode, setEditMode] = useState(false);

  // 편집 모드 ON / OFF
  const startEditor = useCallback(() => setEditMode(true), []);
  const closeEditor = useCallback(() => setEditMode(false), []);

  return (
    <>
      {editMode && (
        <PhotoEditor
          photo={photo}
          photocardId={photocardId}
          closeEditor={closeEditor}
        />
      )}
      {!editMode && <PhotoInfo photo={photo} startEditor={startEditor} />}
      <PhotoRemove photo={photo} photocardId={photocardId} />
    </>
  );
}

export default Success;
