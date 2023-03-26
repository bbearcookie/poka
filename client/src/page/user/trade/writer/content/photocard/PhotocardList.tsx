import React from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import PhotocardItem from '@component/photocard/item/PhotocardItem';
import InputMessage from '@component/form/InputMessage';
import { ItemSection } from '@component/list/content/_styles';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ResType as PhotoResType } from '@api/query/photo/usePhotoQuery';
import { State as FormState, Action as FormAction } from '../../reducer';

interface Props {
  form: FormState;
  formDispatch: React.Dispatch<FormAction>;
  photos: UseQueryResult<PhotoResType, unknown>[];
  removeWantPhotocardId: (photocardId: number) => void;
}

function PhotocardList({ form, formDispatch, photos, removeWantPhotocardId }: Props) {
  return (
    <div>
      {photos.length > 0 &&
      <>
        <b className="label">종류</b>
        <ItemSection margin="1em 0">
          {photos.map((photo) => photo.status === 'success' && 
          <PhotocardItem
            {...photo.data}
            key={photo.data.photocardId}
            icon={{ svg: faClose, tooltip: '취소' }}
            onClick={removeWantPhotocardId}
          />)}
        </ItemSection>
      </>}
    {form.message.wantPhotocardIds && <InputMessage styles={{ margin: "0 0 0.5em 0" }}>{form.message.wantPhotocardIds}</InputMessage>}
    </div>
  );
}

export default PhotocardList;