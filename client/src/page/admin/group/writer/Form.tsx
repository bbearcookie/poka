import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from '@util/commonAPI';
import Input from '@component/form/Input';
import Button from '@component/form/Button';
import WhiteCard, { WhiteCardHeader, WhiteCardBody } from '@component/card/WhiteCard';
import ImageUploader, { Image } from '@component/form/uploader/ImageUploader';
import * as groupAPI from '@api/groupAPI';

interface FormProps {
  children?: React.ReactNode;
}

const FormDefaultProps = {};

function Form({ children }: FormProps & typeof FormDefaultProps) {
  interface FormType {
    name: string;
    image: Image;
  };
  const [form, setForm] = useState<FormType>({
    name: '',
    image: {
      file: null,
      previewURL: null,
      initialURL: ''
    }
  });
  const [formMessage, setFormMessage] = useState<{
    [k in keyof FormType]: string;
  }>({
    name: '',
    image: ''
  });
  const navigate = useNavigate();

  // 데이터 추가 요청
  const postMutation = useMutation(groupAPI.postGroup.axios, {
    onSuccess: (result: AxiosResponse<typeof groupAPI.postGroup.resType>) => {
      toast.success(result.data?.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      return navigate('/admin/group/list');
    },
    onError: (err: AxiosError<ErrorType<FormType>>) => {
      toast.error(err.response?.data.message, { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });

      let message = formMessage;
      err.response?.data.errors.forEach((e) => {
        message[e.param] = e.message;
      });
      setFormMessage({ ...formMessage, ...message });
    }
  });

  // 유효성 검사
  const validate = useCallback((name: keyof FormType) => {
    switch (name) {
      case 'name':
        if (!form.name) return '이름은 비어있을 수 없어요.';
        break;
      case 'image':
        if (!form.image.file) return '업로드 된 이미지가 없어요.';
        break;
      default:
        break;
    }
    return '';
  }, [form]);

  // input 포커스 해제시 유효성 검사
  const blurInput = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.name as unknown as keyof FormType;
    setFormMessage({ ...formMessage, [name]: validate(name)});
  }, [formMessage, validate]);

  // input 상태 값 변경
  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }, [form]);

  // 이미지 상태 값 변경
  const changeImage = useCallback((img: Image) => {
    setForm({...form, image: img});
    img.file && setFormMessage({ ...formMessage, image: '' }); // 업로드 한 이미지가 있다면 오류 메시지 삭제
  }, [form, formMessage]);

  // 폼 전송 이벤트
  const onSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // 전체 폼 요소 유효성 검사 함수
    const validateAll = () => {
      let message = formMessage;
      let valid = true;

      Object.keys(formMessage).forEach((key) => {
        const name = key as unknown as keyof FormType;
        message[name] = validate(name);
        if (message[name]) valid = false;
      });
      setFormMessage({ ...formMessage, ...message });

      return valid;
    };

    if (validateAll()) {
      postMutation.mutate({
        ...form,
        image: form.image.file
      });
    } else {
      toast.error('올바른 정보를 입력해주세요.', { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT});
    }

  }, [form, formMessage, postMutation, validate]);

  // 취소 버튼 클릭시
  const goBack = useCallback(() => {
    return navigate('/admin/group/list');
  }, [navigate]);

  return (
    <form onSubmit={onSubmit}>
      <WhiteCard>
        <WhiteCardBody>
          <h3 className="label">이름</h3>
          <Input
            type="text"
            name="name"
            value={form.name}
            message={formMessage.name}
            placeholder="이름을 입력하세요"
            maxLength={20}
            autoComplete="off"
            onChange={changeInput}
            onBlur={blurInput}
          />
          <p className="description">아이돌 그룹의 이름을 지정합니다. 이 이름은 사용자가 포토카드를 찾거나, 관리자가 포토카드 정보를 관리할 때 사용됩니다.</p>
        </WhiteCardBody>
      </WhiteCard>

      <WhiteCard className="logo-card">
        <WhiteCardBody>
          <h3 className="label">로고 이미지</h3>
          <ImageUploader value={form.image} onChange={changeImage} message={formMessage.image} />
        </WhiteCardBody>
      </WhiteCard>

      <section className="button-section">
        <Button theme="primary-outlined" padding="1em 2em" onClick={goBack}>취소</Button>
        <Button theme="primary" type="submit" padding="1em 2em">작성</Button>
      </section>
    </form>
  );
}

Form.defaultProps = FormDefaultProps;

export default Form;