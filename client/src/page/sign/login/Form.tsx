import React, { useReducer, useCallback } from 'react';
import useLogin from '@feature/auth/hook/useLogin';
import Input from '@component/form/input/Input';
import Button from '@component/form/button/Button';
import { InputMessage } from '@component/form/_styles';
import reducer, { initialState, FormType } from './reducer';

function Form() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loginMutation = useLogin<keyof FormType>({
    onError: err => {
      err.response?.data.errors.forEach(e => {
        dispatch({ type: 'SET_MESSAGE', target: e.param, value: e.message });
      });
    },
  });

  // input 포커스 해제시 오류 메시지 제거
  const blurInput = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      dispatch({ type: 'SET_MESSAGE', target: e.target.name as keyof FormType, value: '' });
    },
    [dispatch]
  );

  // input 상태 값 변경
  const changeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: 'SET_FORM_DATA',
        target: e.target.name as keyof FormType,
        value: e.target.value,
      });
    },
    [dispatch]
  );

  // 폼 전송 이벤트
  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      loginMutation.mutate({ ...state.form });
    },
    [state, loginMutation]
  );

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
          css={{
            width: '100%',
            height: '2.5rem',
          }}
        />
        <InputMessage css={{ margin: '0.5em 0 0 0.8em', wordBreak: 'break-all' }}>
          {state.message.username}
        </InputMessage>
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
          css={{
            width: '100%',
            height: '2.5rem',
          }}
        />
        <InputMessage css={{ margin: '0.5em 0 0 0.8em', wordBreak: 'break-all' }}>
          {state.message.password}
        </InputMessage>
      </section>

      <Button
        buttonTheme="primary"
        type="submit"
        css={{ width: '100%', justifyContent: 'center', margin: '0 auto', marginTop: '2em' }}
      >
        <b>로그인</b>
      </Button>
    </form>
  );
}

export default Form;
