import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import * as authAPI from '@api/authAPI';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType, getErrorMessage } from '@util/request';
import Input from '@component/form/Input';
import Button from '@component/form/Button';
import InputMessage from '@component/form/InputMessage';

interface Props {}
const DefaultProps = {};

function Form({  }: Props) {
  interface InputType {
    username: string;
    nickname: string;
    password: string;
    passwordCheck: string;
  }
  const [input, setInput] = useState<InputType>({
    username: '',
    nickname: '',
    password: '',
    passwordCheck: ''
  });
  const [inputMessage, setInputMessage] = useState<{
    [k in keyof InputType]: string;
  }>({
    username: '',
    nickname: '',
    password: '',
    passwordCheck: ''
  });
  const navigate = useNavigate();

  // 회원가입 요청
  const postMutation = useMutation(authAPI.postSignup.axios, {
    onSuccess: (res: AxiosResponse<typeof authAPI.postSignup.resType>) => {
      toast.success(res.data?.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      return navigate('/login');
    },
    onError: (err: AxiosError<ErrorType<keyof InputType>>) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });

      let message = inputMessage;
      err.response?.data.errors.forEach((e) => {
        message[e.param] = e.message;
      });
      setInputMessage({ ...inputMessage, ...message });
    }
  });

  // input 포커스 해제시 오류 메시지 제거
  const blurInput = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.name as unknown as keyof InputType;
    setInputMessage({ ...inputMessage, [name]: '' });
  }, [inputMessage]);

  // input 상태 값 변경
  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }, [input]);

  // 폼 전송 이벤트
  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    postMutation.mutate({
      data: {
        username: input.username,
        nickname: input.nickname,
        password: input.password,
        passwordCheck: input.passwordCheck
      }
    });
  }, [input, postMutation]);

  return (
    <form onSubmit={onSubmit}>
      <section className="input-section">
        <h3 className="label">아이디</h3>
        <Input
          name="username"
          type="text"
          placeholder="아이디를 입력하세요"
          autoComplete="off"
          onChange={changeInput}
          onBlur={blurInput}
          styles={{
            width: '100%',
            height: '2.5rem'
          }}
        >
          <InputMessage styles={{ margin: "0.5em 0 0 0.8em", wordBreak: 'break-all'}}>{inputMessage.username}</InputMessage>
        </Input>
      </section>

      <section className="input-section">
        <h3 className="label">닉네임</h3>
        <Input
          name="nickname"
          type="text"
          placeholder="닉네임을 입력하세요"
          autoComplete="off"
          onChange={changeInput}
          onBlur={blurInput}
          styles={{
            width: '100%',
            height: '2.5rem'
          }}
        >
          <InputMessage styles={{ margin: "0.5em 0 0 0.8em", wordBreak: 'break-all'}}>{inputMessage.nickname}</InputMessage>
        </Input>
      </section>

      <section className="input-section">
        <h3 className="label">비밀번호</h3>
        <Input
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          autoComplete="off"
          onChange={changeInput}
          onBlur={blurInput}
          styles={{
            width: "100%",
            height: "2.5rem"
          }}
        >
          <InputMessage styles={{ margin: "0.5em 0 0 0.8em", wordBreak: 'break-all'}}>{inputMessage.password}</InputMessage>
        </Input>
      </section>

      <section className="input-section">
        <h3 className="label">비밀번호 확인</h3>
        <Input
          name="passwordCheck"
          type="password"
          placeholder="비밀번호를 다시 한번 입력하세요"
          autoComplete="off"
          onChange={changeInput}
          onBlur={blurInput}
          styles={{
            width: "100%",
            height: "2.5rem"
          }}
        >
          <InputMessage styles={{ margin: "0.5em 0 0 0.8em", wordBreak: 'break-all'}}>{inputMessage.passwordCheck}</InputMessage>
        </Input>
      </section>

      <Button type="submit" styles={{ theme: "primary", width: "100%", marginTop: "2em" }}><b>가입하기</b></Button>
    </form>
  );
}

export default Form;