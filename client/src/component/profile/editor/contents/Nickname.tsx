import React, { useCallback } from 'react';
import Input from '@component/form/input/Input';
import { InputMessage } from '@component/form/_styles';
import { State, Action } from '../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function Nickname({ state, dispatch }: Props) {
  // 닉네임 상태 값 변경
  const changeNickname = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'SET_NICKNAME', nickname: e.target.value });
      dispatch({ type: 'SET_MESSAGE', target: 'nickname', value: '' });
    },
    [dispatch]
  );

  return (
    <article className="nickname-section">
      <p className="label">
        <b>닉네임</b>
      </p>
      <Input
        type="text"
        name="nickname"
        value={state.form.nickname}
        placeholder="수정할 닉네임을 입력해주세요"
        css={{
          width: '100%',
          height: '2.5em',
        }}
        onChange={changeNickname}
      />
      {state.message.nickname && <InputMessage>{state.message.nickname}</InputMessage>}
    </article>
  );
}

export default Nickname;
