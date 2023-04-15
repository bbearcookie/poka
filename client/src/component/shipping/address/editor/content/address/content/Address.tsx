import React from 'react';
import Input from '@component/form/input/Input';
import { InputMessage } from '@component/form/_styles';
import { State, Action } from '../../../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function Address({ state, dispatch }: Props) {
  return (
    <>
      <Input
        type="text"
        name="address"
        value={state.form.address}
        placeholder="주소"
        readOnly={true}
        css={{
          display: 'inline-block',
          width: '100%',
          height: '2.5em',
        }}
      />
    </>
  );
}

export default Address;
