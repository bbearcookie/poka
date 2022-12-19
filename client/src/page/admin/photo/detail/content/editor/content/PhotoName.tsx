import React, { useCallback } from 'react';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';
import { State, Action } from '../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}
const DefaultProps = {};

function PhotoName({ state, dispatch }: Props) {

  // input 상태 값 변경
  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_NAME', name: e.target.value });
    dispatch({ type: 'SET_MESSAGE', payload: { target: 'name', value: '' } });
  }, [dispatch]);

  return (
    <section className="input-section">
      <p className="label">포토카드 이름</p>
      <Input
        type="text"
        name="name"
        value={state.form.name}
        onChange={changeInput}
        styles={{
          width: "100%",
          height: "2.5em"
        }}
      >
        {state.message.name && <InputMessage>{state.message.name}</InputMessage>}
      </Input>
    </section>
  );
}

export default PhotoName;