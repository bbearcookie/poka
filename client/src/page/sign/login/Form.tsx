import React, { useState, useCallback } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import * as authAPI from '@api/authAPI';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from '@util/commonAPI';
import Input from '@component/form/Input';
import Button from '@component/form/Button';
import InputMessage from '@component/form/InputMessage';

interface FormProps {
  children?: React.ReactNode;
}
const FormDefaultProps = {};

function Form({ children }: FormProps & typeof FormDefaultProps) {
  interface InputType {
    username: string;
    password: string;
  }
  const [input, setInput] = useState<InputType>({
    username: '',
    password: ''
  });
  const [inputMessage, setInputMessage] = useState<{
    [k in keyof InputType]: string;
  }>({
    username: '',
    password: '',
  });

  // 로그인 요청
  const postMutation = useMutation(authAPI.postLogin.axios, {
    onSuccess: (res: AxiosResponse<typeof authAPI.postLogin.resType>) => {
      console.log(res);
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
        password: input.password
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

      {/* {message && <InputMessage styles={{ margin: "1em 0 0 0" }}>{message}</InputMessage>} */}
      <Button type="submit" styles={{ theme: "primary", width: "100%", marginTop: "2em" }}><b>로그인</b></Button>
    </form>
  );
}

Form.defaultProps = FormDefaultProps;
export default Form;