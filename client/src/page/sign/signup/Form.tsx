import React, { useState, useCallback } from 'react';
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
  const [message, setMessage] = useState("");

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
    console.log(input);
  }, [input]);

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
          styles={{
            width: '100%',
            height: '2.5rem'
          }}
        />
      </section>

      <section className="input-section">
        <h3 className="label">닉네임</h3>
        <Input
          name="nickname"
          type="text"
          placeholder="닉네임을 입력하세요"
          autoComplete="off"
          onChange={changeInput}
          styles={{
            width: '100%',
            height: '2.5rem'
          }}
        />
      </section>

      <section className="input-section">
        <h3 className="label">비밀번호</h3>
        <Input
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          autoComplete="off"
          onChange={changeInput}
          styles={{
            width: "100%",
            height: "2.5rem"
          }}
        />
      </section>

      <section className="input-section">
        <h3 className="label">비밀번호 확인</h3>
        <Input
          name="passwordCheck"
          type="password"
          placeholder="비밀번호를 다시 한번 입력하세요"
          autoComplete="off"
          onChange={changeInput}
          styles={{
            width: "100%",
            height: "2.5rem"
          }}
        />
      </section>

      {message && <InputMessage styles={{ margin: "1em 0 0 0" }}>{message}</InputMessage>}
      <Button type="submit" styles={{ theme: "primary", width: "100%", marginTop: "2em" }}><b>가입하기</b></Button>
    </form>
  );
}

Form.defaultProps = FormDefaultProps;
export default Form;