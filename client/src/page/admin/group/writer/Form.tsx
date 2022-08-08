import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from '@util/commonAPI';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';
import Button from '@component/form/Button';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import ImageUploader, { Image } from '@component/form/uploader/ImageUploader';
import * as groupAPI from '@api/groupAPI';

interface FormProps {
  name?: string;
  imageName?: string;
  groupId?: number;
  children?: React.ReactNode;
}

const FormDefaultProps = {
  name: '',
  imageName: ''
};

function Form({ name, imageName, groupId, children }: FormProps & typeof FormDefaultProps) {
  interface InputType {
    name: string;
    image: Image;
  };
  const [input, setInput] = useState<InputType>({
    name,
    image: {
      file: null,
      previewURL: imageName,
      initialURL: imageName
    }
  });
  const [inputMessage, setInputMessage] = useState<{
    [k in keyof InputType]: string;
  }>({
    name: '',
    image: ''
  });
  const navigate = useNavigate();

  // 데이터 추가 요청
  const postMutation = useMutation(groupAPI.postGroup.axios, {
    onSuccess: (res: AxiosResponse<typeof groupAPI.postGroup.resType>) => {
      toast.success(res.data?.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      return navigate('/admin/group/list');
    },
    onError: (err: AxiosError<ErrorType<keyof InputType>>) => {
      toast.error(err.response?.data.message, { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });

      let message = inputMessage;
      err.response?.data.errors.forEach((e) => {
        message[e.param] = e.message;
      });
      setInputMessage({ ...inputMessage, ...message });
    }
  });

  // 데이터 수정 요청
  const putMutation = useMutation(groupAPI.putGroup.axios, {
    onSuccess: (res: AxiosResponse<typeof groupAPI.putGroup.resType>) => {
      toast.success(res.data?.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      return navigate(`/admin/group/detail/${groupId}`);
    },
    onError: (err: AxiosError<ErrorType<keyof InputType>>) => {
      if (err.response?.data.message) toast.error(err.response?.data.message, { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
      else toast.error(err.message, { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });

      let message = inputMessage;
      err.response?.data.errors.forEach((e) => {
        message[e.param] = e.message;
      });
      setInputMessage({ ...inputMessage, ...message });
    }
  });

  // 유효성 검사
  const validate = useCallback((name: keyof InputType) => {
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
  }, [input]);

  // input 포커스 해제시 유효성 검사
  const blurInput = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.name as unknown as keyof InputType;
    setInputMessage({ ...inputMessage, [name]: validate(name)});
  }, [inputMessage, validate]);

  // input 상태 값 변경
  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }, [input]);

  // 이미지 상태 값 변경
  const changeImage = useCallback((img: Image) => {
    setInput({...input, image: img});
    img.file && setInputMessage({ ...inputMessage, image: '' }); // 업로드 한 이미지가 있다면 오류 메시지 삭제
  }, [input, inputMessage]);

  // 폼 전송 이벤트
  const onSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // 전체 폼 요소 유효성 검사 함수
    const validateAll = () => {
      let message = inputMessage;
      let valid = true;

      Object.keys(inputMessage).forEach((key) => {
        const name = key as unknown as keyof InputType;
        message[name] = validate(name);
        if (message[name]) valid = false;
      });
      setInputMessage({ ...inputMessage, ...message });

      return valid;
    };

    if (!validateAll()) return toast.error('올바른 정보를 입력해주세요.', { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT});

    if (groupId) {
      putMutation.mutate({
        groupId,
        data: {
          ...input,
          image: input.image.file
        }
      });
    } else {
      postMutation.mutate({
        data: {
          ...input,
          image: input.image.file
        }
      });
    }

  }, [input, inputMessage, postMutation, putMutation, groupId, validate]);

  // 취소 버튼 클릭시
  const goBack = useCallback(() => {
    if (groupId) return navigate(`/admin/group/detail/${groupId}`);
    else return navigate('/admin/group/list')
  }, [navigate, groupId]);

  return (
    <form onSubmit={onSubmit}>
      <Card marginBottom="2em">
        <CardBody>
          <h3 className="label">이름</h3>
          <Input
            type="text"
            name="name"
            value={input.name}
            placeholder="이름을 입력하세요"
            maxLength={20}
            autoComplete="off"
            onChange={changeInput}
            onBlur={blurInput}
            styles={{
              width: "100%",
              height: "2.5em",
              marginBottom: "1em"
            }}
          >
            <InputMessage styles={{margin: "0.5em 0 0 0.8em"}}>{inputMessage.name}</InputMessage>
          </Input>
          <p className="description">아이돌 그룹의 이름을 지정합니다. 이 이름은 사용자가 포토카드를 찾거나, 관리자가 포토카드 정보를 관리할 때 사용됩니다.</p>
        </CardBody>
      </Card>

      <Card className="logo-card">
        <CardBody>
          <h3 className="label">로고 이미지</h3>
          <ImageUploader
            value={input.image}
            onChange={changeImage}
            message={inputMessage.image}
            imageStyles={{ maxWidth: "100%"  }}
          />
        </CardBody>
      </Card>

      <section className="button-section">
        <Button
          onClick={goBack}
          styles={{
            theme: "primary-outlined",
            padding: "1em 2em"
          }}
        >취소</Button>
        <Button
          type="submit"
          styles={{
            theme: "primary",
            padding:"1em 2em"
          }}
        >작성</Button>
      </section>
    </form>
  );
}

Form.defaultProps = FormDefaultProps;

export default Form;