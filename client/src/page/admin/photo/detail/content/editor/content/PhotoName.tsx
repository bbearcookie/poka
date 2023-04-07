import React, { useCallback } from 'react';
import Input from '@component/form/input/Input';
import { InputMessage } from '@component/form/_styles';
import { State, Action } from '../reducer';
import { InputSection } from './_styles';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function PhotoName({ state, dispatch }: Props) {
  // input 상태 값 변경
  const changeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'SET_NAME', name: e.target.value });
      dispatch({ type: 'SET_MESSAGE', payload: { target: 'name', value: '' } });
    },
    [dispatch]
  );

  return (
    <InputSection>
      <p className="label">포토카드 이름</p>
      <Input
        type="text"
        name="name"
        value={state.form.name}
        onChange={changeInput}
        css={{
          width: '100%',
          height: '2.5em',
        }}
      />
      {state.message.name && <InputMessage>{state.message.name}</InputMessage>}
    </InputSection>
  );
}

export default PhotoName;
