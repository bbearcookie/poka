import React, { useReducer, useCallback } from 'react';
import produce from 'immer';
import { photoImage } from '@api/resource';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import useModifyPhoto from '@api/mutation/photo/useModifyPhoto';
import { ResType as PhotoResType } from '@api/query/photo/usePhotoQuery';
import reducer, { initialState, FormType } from './reducer';
import ImageUploadSection from './content/ImageUploadSection';
import ButtonSection from './content/ButtonSection';
import PhotoName from './content/PhotoName';
import GroupSelect from './content/GroupSelect';
import MemberSelect from './content/MemberSelect';

interface Props {
  photo: PhotoResType;
  photocardId: number;
  closeEditor: () => void;
}
const DefaultProps = {};

function PhotoEditor({ photo, photocardId, closeEditor }: Props) {
  const [state, dispatch] = useReducer(reducer, produce(initialState, draft => {
    draft.form.name = photo.name;
    draft.form.groupId = photo.groupId;
    draft.form.memberId = photo.memberId;
    draft.form.image.previewURL = photoImage(photo.imageName);
    draft.form.image.initialURL = photoImage(photo.imageName);
  }));

  // 데이터 수정 요청
  const putMutation = useModifyPhoto<keyof FormType>(
    (res) => closeEditor(),
    (err) => {
      err.response?.data.errors.forEach((e) => {
        dispatch({ type: 'SET_MESSAGE', payload: { target: e.param, value: '' } })
      });
    }
  )

  // 전송 이벤트
  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
    putMutation.mutate({
      photocardId,
      body: {
       ...state.form,
       image: state.form.image.file
      }
    });
  }, [photocardId, state, putMutation]);

  return (
    <Card className="PhotoEditor" styles={{ marginBottom: "5em" }}>
      <CardBody>
        <form onSubmit={onSubmit}>
          <section className="photo-section">
            <ImageUploadSection state={state} dispatch={dispatch} />

            <section className="description-section">
              <PhotoName state={state} dispatch={dispatch} />
              <GroupSelect state={state} dispatch={dispatch} />
              <MemberSelect state={state} dispatch={dispatch} />
              <ButtonSection closeEditor={closeEditor} />
            </section>
          </section>
        </form>
      </CardBody>
    </Card>
  );
}

export default PhotoEditor;