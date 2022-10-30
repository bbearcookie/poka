import React, { useState, useCallback } from 'react';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import ImageUploader, { Image } from '@component/form/uploader/ImageUploader';
import Button from '@component/form/Button';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';

interface UserEditorProps {
  closeEditor: () => void;
  children?: React.ReactNode;
}
const UserEditorDefaultProps = {};

function UserEditor({ closeEditor, children }: UserEditorProps & typeof UserEditorDefaultProps) {
  interface FormType {
    image: Image;
    nickname: string;
  }
  const [form, setForm] = useState<FormType>({
    image: {
      file: null,
      previewURL: null,
      initialURL: ''
    },
    nickname: ''
  });
  const [formMessage, setFormMessage] = useState<{
    [k in keyof FormType]: string;
  }>({
    image: '',
    nickname: ''
  });

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
    console.log(form);
  }, [form]);

  return (
    <Card marginBottom="5em">
      <CardBody>
        <section className="editor-section">
          <section className="image-section">
            <ImageUploader
              value={form.image}
              message={formMessage.image}
              onChange={changeImage}
              styles={{ width: "100px", height: "100px" }}
              imageStyles={{ width: "100px", height: "100px" }}
            />
          </section>

          <section className="description-section">
            <p className="label">닉네임</p>
            <Input
              type="text"
              name="nickname"
              value={form.nickname}
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