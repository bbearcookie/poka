import React from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import PhotoCard from '@component/photocard/PhotoCard';
import InputMessage from '@component/form/InputMessage';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { PhotoType } from '@type/photo';
import { ResType as PhotoResType } from '@api/query/photo/usePhotoQuery';
import { State as FormState, Action as FormAction } from '../../reducer';

interface Props {
  form: FormState;
  formDispatch: React.Dispatch<FormAction>;
  photos: UseQueryResult<PhotoResType, unknown>[];
  removeWantPhotocardId: (photocardId: number) => void;
}
const DefaultProps = {};

function PhotocardList({ form, formDispatch, photos, removeWantPhotocardId }: Props) {
  return (
    <div>
      {photos.length > 0 &&
      <>
        <b className="label">종류</b>
        <section className="photo-section">
          {photos.map((photo) => photo.status === 'success' && 
          <PhotoCard
            key={photo.data.photocard_id}
            photo={photo.data as PhotoType}
            icon={faClose}
            handleClickIcon={removeWantPhotocardId}
          />)}
        </section>
      </>}
    {form.message.wantPhotocardIds && <InputMessage styles={{ margin: "0 0 0.5em 0" }}>{form.message.wantPhotocardIds}</InputMessage>}
    </div>
  );
}

export default PhotocardList;