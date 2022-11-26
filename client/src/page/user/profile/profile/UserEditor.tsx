import React, { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as userAPI from '@api/userAPI';
import * as queryKey from '@util/queryKey';
import { ErrorType } from '@util/request';
import { AxiosError, AxiosResponse } from 'axios';
import { getErrorMessage } from '@util/request';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import ImageUploader, { Image } from '@component/form/uploader/ImageUploader';
import Button from '@component/form/Button';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';

interface UserEditorProps {
  userId?: number;
  nickname?: string;
  imageName?: string;
  closeEditor: () => void;
  children?: React.ReactNode;
}
const UserEditorDefaultProps = {
  userId: 0,
  nickname: '',
  imageName: ''
};

function UserEditor({ userId, nickname, imageName, closeEditor, children }: UserEditorProps & typeof UserEditorDefaultProps) {
  interface FormType {
    nickname: string;
    image: Image;
  }
  const [form, setForm] = useState<FormType>({
    nickname,
    image: {
      file: null,
      previewURL: imageName,
      initialURL: imageName
    },
  });
  const [formMessage, setFormMessage] = useState<{
    [k in keyof FormType]: string;
  }>({
    nickname: '',
    image: ''
  });
  const queryClient = useQueryClient();

  // 데이터 수정 요청
  const putMutation = useMutation(userAPI.putUserProfile.axios, {
    onSuccess: (res: AxiosResponse<typeof userAPI.putUserProfile.resType>) => {
      toast.success(res.data?.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      queryClient.invalidateQueries(queryKey.userKeys.profile(userId));
      closeEditor();
    },
    onError: (err: AxiosError<ErrorType<keyof FormType>>) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });

      let message = formMessage;
      err.response?.data.errors.forEach((e) => {
        message[e.param] = e.message;
      });
      setFormMessage({ ...formMessage, ...message });
    }
  })

  // input 상태 값 변경
  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setFormMessage({ ...formMessage, [e.target.name]: '' });
  }, [form, formMessage]);

  // 이미지 상태 값 변경
  const changeImage = useCallback((img: Image) => {
    setForm({...form, image: img});
    img.file && setFormMessage({ ...formMessage, image: '' }); // 업로드 한 이미지가 있다면 오류 메시지 삭제
  }, [form, formMessage]);
  
  // 전송 이벤트
  const onSubmit = useCallback(() => {
    putMutation.mutate({
      userId: userId,
      data: {
        ...form,
        image: form.image.file
      }
    });
  }, [form, putMutation, userId]);

  return (
    <Card styles={{ marginBottom: "5em" }}>
      <CardBody>
        <section className="editor-section">
          <section className="image-section">
            <p className="label">이미지</p>
            <ImageUploader
              value={form.image}
              errorMessage={formMessage.image}
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
              value={form.nickname}
              placeholder='수정할 닉네임을 입력해주세요'
              styles={{
                width: "100%",
                height: "2.5em"
              }}
              onChange={changeInput}
            >
              {formMessage.nickname && <InputMessage>{formMessage.nickname}</InputMessage>}
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

UserEditor.defaultProps = UserEditorDefaultProps;
export default UserEditor;