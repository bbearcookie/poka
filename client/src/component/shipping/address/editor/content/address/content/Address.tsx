import React from 'react';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';
import { State, Action } from '../../../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function Address({ state, dispatch }: Props) {
  return (
    <Input
      type="text"
      name="address"
      value={state.form.address}
      placeholder="주소"
      readOnly={true}
      styles={{
        display: 'inline-block',
        width: '100%',
        height: '2.5em',
      }}
    >
      {state.message.address && (
        <InputMessage styles={{ margin: '0.5em 0 0 0' }}>{state.message.address}</InputMessage>
      )}
    </Input>
  );
}

export default Address;
