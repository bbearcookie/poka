import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { ResponseError } from '@type/response';
import Input from '@component/form/input/Input';
import { InputMessage } from '@component/form/_styles';
import Button from '@component/form/button/Button';
import { Card, CardBody } from '@component/card/basic/_styles';
import ImageUploader, { Image } from '@component/form/uploader/ImageUploader';
import useAddGroup from '@api/mutation/group/useAddGroup';
import useModifyGroup from '@api/mutation/group/useModifyGroup';

interface Props {
  name?: string;
  imageName?: string;
  groupId?: number;
}
const DefaultProps = {
  name: '',
  imageName: '',
};

function Form({ name = DefaultProps.name, imageName = DefaultProps.imageName, groupId }: Props) {
  interface InputType {
    name: string;
    image: Image;
  }
  const [input, setInput] = useState<InputType>({
    name,
    image: {
      file: null,
      previewURL: imageName,
      initialURL: imageName,
    },
  });
  const [inputMessage, setInputMessage] = useState<{
    [k in keyof InputType]: string;
  }>({
    name: '',
    image: '',
  });
  const navigate = useNavigate();

  // 요청 실패시 콜백 함수
  const onMutationError = useCallback(
    (err: AxiosError<ResponseError<keyof InputType>>) => {
      let message = inputMessage;
      err.response?.data.errors.forEach(e => {
        message[e.param] = e.message;
      });
      setInputMessage({ ...inputMessage, ...message });
    },
    [inputMessage]
  );

  // 데이터 추가 요청
  const postMutation = useAddGroup<keyof InputType>(
    res => navigate(`/admin/group/list`),
    onMutationError
  );

  // 데이터 수정 요청
  const putMutation = useModifyGroup<keyof InputType>(
    groupId || 0,
    res => navigate(`/admin/group/detail/${groupId}`),
    onMutationError
  );

  // 유효성 검사
  const validate = useCallback(
    (name: keyof InputType) => {
      switch (name) {
        case 'name':
          if (!input.name) return '이름은 비어있을 수 없어요.';
          break;
        case 'image':
          if (!input.image.file && !input.image.initialURL) return '업로드 된 이미지가 없어요.';
          break;
        default:
          break;
      }
      return '';
    },
    [input]
  );

  // input 포커스 해제시 유효성 검사
  const blurInput = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const name = e.target.name as unknown as keyof InputType;
      setInputMessage({ ...inputMessage, [name]: validate(name) });
    },
    [inputMessage, validate]
  );

  // input 상태 값 변경
  const changeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    },
    [input]
  );

  // 이미지 상태 값 변경
  const changeImage = useCallback(
    (img: Image) => {
      setInput({ ...input, image: img });
      img.file && setInputMessage({ ...inputMessage, image: '' }); // 업로드 한 이미지가 있다면 오류 메시지 삭제
    },
    [input, inputMessage]
  );

  // 폼 전송 이벤트
  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // 그룹 수정중이면 수정 요청
      if (groupId) {
        putMutation.mutate({
          name: input.name,
          image: input.image.file,
        });

        // 새로운 그룹 작성중이면 추가 요청
      } else {
        postMutation.mutate({
          name: input.name,
          image: input.image.file,
        });
      }
    },
    [input, postMutation, putMutation, groupId]
  );

  // 취소 버튼 클릭시
  const goBack = useCallback(() => {
    if (groupId) return navigate(`/admin/group/detail/${groupId}`);
    else return navigate('/admin/group/list');
  }, [navigate, groupId]);

  return (
    <form onSubmit={onSubmit}>
      <section>
        <Card className="logo-card">
          <CardBody>
            <h1 className="title">로고 이미지</h1>
            <ImageUploader
              value={input.image}
              onChange={changeImage}
              errorMessage={inputMessage.image}
              description={
                <p className="description">
                  파일 업로드
                  <br />
                  Drag & Drop
                </p>
              }
              styles={{ height: '20em' }}
            />
          </CardBody>
        </Card>
      </section>

      <section>
        <Card className="contents-card">
          <CardBody>
            <h1 className="title">이름</h1>
            <Input
              type="text"
              name="name"
              value={input.name}
              placeholder="이름을 입력하세요"
              maxLength={20}
              autoComplete="off"
              onChange={changeInput}
              onBlur={blurInput}
              css={{
                width: '100%',
                height: '2.5em',
                marginBottom: '1em',
              }}
            />
            <InputMessage css={{ margin: '0.5em 0 0 0.8em' }}>{inputMessage.name}</InputMessage>
            <p className="description">
              아이돌 그룹의 이름을 지정합니다. 이 이름은 사용자가 포토카드를 찾거나, 관리자가
              포토카드 정보를 관리할 때 사용됩니다.
            </p>
          </CardBody>
        </Card>
      </section>

      <section className="button-section">
        <Button
          onClick={goBack}
          buttonTheme="primary-outlined"
          css={{
            padding: '1em 2em',
          }}
        >
          취소
        </Button>
        <Button
          type="submit"
          buttonTheme="primary"
          css={{
            padding: '1em 2em',
          }}
        >
          작성
        </Button>
      </section>
    </form>
  );
}

export default Form;
