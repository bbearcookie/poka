import React from 'react';
import InputComponent from '@component/form/Input';
import { InputMessage } from '@component/form/_styles';
import { State, Action } from '../../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  changeInput: React.ChangeEventHandler<HTMLInputElement>;
  blurInput: React.FocusEventHandler<HTMLInputElement>;
}

function Input({ state, dispatch, changeInput, blurInput }: Props) {
  return (
    <InputComponent
      type="text"
      name="requirement"
      placeholder="직접 입력"
      maxLength={50}
      value={state.form.requirement}
      onChange={changeInput}
      onBlur={blurInput}
      styles={{
        width: '100%',
        height: '2.5em',
        marginTop: '0.5em',
      }}
    >
      {state.message.requirement && (
        <InputMessage css={{ margin: '0.5em 0 0 0' }}>{state.message.requirement}</InputMessage>
      )}
    </InputComponent>
  );
}

export default Input;
