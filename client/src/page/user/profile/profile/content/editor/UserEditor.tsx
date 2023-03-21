import React, { useReducer, useCallback } from 'react';
import produce from 'immer';
import useModifyUserProfile from '@api/mutation/user/useModifyUserProfile';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import ImageUploader, { Image } from '@component/form/uploader/ImageUploader';
import Button from '@component/form/Button';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';
import reducer, { initialState, FormType } from './reducer';

interface Props {
  userId?: number;
  nickname?: string;
  imageName?: string;
  closeEditor: () => void;
}
const DefaultProps = {
  userId: 0,
  nickname: '',
  imageName: ''
};

function UserEditor({
  userId = DefaultProps.userId,
  nickname = DefaultProps.nickname,
  imageName = DefaultProps.imageName,
  closeEditor
}: Props) {
  const [state, dispatch] = useReducer(reducer, produce(initialState, draft => {
    draft.form.nickname = nickname;
    draft.form.image = {
      file: null,
      previewURL: imageName,
      initialURL: imageName
    }
  }));

  // 데이터 수정 요청
  const putMutation = useModifyUserProfile<keyof FormType>(
    userId,
    (res) => closeEditor(),
    (err) => {
      err.response?.data.errors.forEach((e) => {
        dispatch({ type: 'SET_MESSAGE', target: e.param, value: e.message });
      });
    }
  );

  // input 상태 값 변경
  const changeNickname = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_NICKNAME', nickname: e.target.value });
    dispatch({ type: 'SET_MESSAGE', target: 'nickname', value: '' });
  }, []);

  // 이미지 상태 값 변경
  const changeImage = useCallback((img: Image) => {
    // 업로드 한 이미지가 있다면 오류 메시지 삭제
    if (img.file) dispatch({ type: 'SET_MESSAGE', target: 'image', value: '' });
    dispatch({ type: 'SET_IMAGE', image: img });
  }, []);
  
  // 전송 이벤트
  const onSubmit = useCallback(() => {
    putMutation.mutate({
      nickname: state.form.nickname,
      image: state.form.image.file
    });
  }, [state, putMutation]);

  return (
    <Card styles={{ marginBottom: "5em" }}>
      <CardBody>
        <section className="editor-section">
          <section className="image-section">
            <p className="label">이미지</p>
            <ImageUploader
              value={state.form.image}
              errorMessage={state.message.image}
              onChange={changeImage}
              styles={{
                width: "75px",
                height: "75px",
                borderRadius: "50px",
              }}
            />
          </section>

          <section className="description-section">
            <p className="label">닉네임</p>
            <Input
              type="text"
              name="nickname"
              value={state.form.nickname}
              placeholder='수정할 닉네임을 입력해주세요'
              styles={{
                width: "100%",
                height: "2.5em"
              }}
              onChange={changeNickname}
            >
              {state.message.nickname && <InputMessage>{state.message.nickname}</InputMessage>}
            </Input>
            <div className="space" />

            <section className="button-section">
              <Button
                styles={{
                  width: "fit-content",
                  theme: "primary-outlined",
                  margin: "1em 1em 0 0",
                  padding: "0.7em 1.3em",
                  iconMargin: "1em"
                }}
                onClick={closeEditor}
              >취소</Button>
              <Button
                styles={{
                  width: "fit-content",
                  theme: "primary",
                  marginTop: "1em",
                  padding: "0.7em 1.3em",
                  iconMargin: "1em"
                }}
                onClick={onSubmit}
              >저장</Button>
            </section>
          </section>

        </section>
      </CardBody>
    </Card>
  );
}

export default UserEditor;