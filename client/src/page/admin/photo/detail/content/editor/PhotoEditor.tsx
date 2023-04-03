import React, { useReducer, useCallback } from 'react';
import produce from 'immer';
import { photoImage } from '@api/resource';
import { Card, CardBody } from '@component/card/basic/_styles';
import useModifyPhoto from '@api/mutation/photo/useModifyPhoto';
import { ResType as PhotoResType } from '@api/query/photo/usePhotoQuery';
import reducer, { initialState, FormType } from './reducer';
import ImageUploadSection from './content/ImageUploadSection';
import ButtonSection from './content/ButtonSection';
import PhotoName from './content/PhotoName';
import GroupSelect from './content/GroupSelect';
import MemberSelect from './content/MemberSelect';
import { PhotoSection, DescriptionSection } from './_styles';

interface Props {
  photo: PhotoResType;
  photocardId: number;
  closeEditor: () => void;
}

function PhotoEditor({ photo, photocardId, closeEditor }: Props) {
  const [state, dispatch] = useReducer(
    reducer,
    produce(initialState, draft => {
      draft.form.name = photo.name;
      draft.form.groupId = photo.groupData.groupId;
      draft.form.memberId = photo.memberData.memberId;
      draft.form.image.previewURL = photoImage(photo.imageName);
      draft.form.image.initialURL = photoImage(photo.imageName);
    })
  );

  // 데이터 수정 요청
  const putMutation = useModifyPhoto<keyof FormType>(
    photocardId,
    res => closeEditor(),
    err => {
      err.response?.data.errors.forEach(e => {
        dispatch({ type: 'SET_MESSAGE', payload: { target: e.param, value: '' } });
      });
    }
  );

  // 전송 이벤트
  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      console.log(state);
      putMutation.mutate({
        ...state.form,
        image: state.form.image.file,
      });
    },
    [state, putMutation]
  );

  return (
    <Card className="PhotoEditor">
      <CardBody>
        <form onSubmit={onSubmit}>
          <PhotoSection>
            <ImageUploadSection state={state} dispatch={dispatch} />

            <DescriptionSection>
              <PhotoName state={state} dispatch={dispatch} />
              <GroupSelect state={state} dispatch={dispatch} />
              <MemberSelect state={state} dispatch={dispatch} />
              <ButtonSection closeEditor={closeEditor} />
            </DescriptionSection>
          </PhotoSection>
        </form>
      </CardBody>
    </Card>
  );
}

export default PhotoEditor;
