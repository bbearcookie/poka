import React from 'react';
import Input from '@component/form/Input';
import { InputMessage } from '@component/form/_styles';
import { State, Action } from '../../../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  changeInput: React.ChangeEventHandler<HTMLInputElement>;
  blurInput: React.FocusEventHandler<HTMLInputElement>;
}

function AddressDetail({ state, dispatch, changeInput, blurInput }: Props) {
  return (
    <Input
      type="text"
      name="addressDetail"
      value={state.form.addressDetail}
      placeholder="상세주소"
      maxLength={50}
      onChange={changeInput}
      onBlur={blurInput}
      styles={{
        display: 'inline-block',
        width: '100%',
        height: '2.5em',
      }}
    >
      {state.message.addressDetail && (
        <InputMessage css={{ margin: '0.5em 0 0 0' }}>
          {state.message.addressDetail}
        </InputMessage>
      )}
    </Input>
  );
}

export default AddressDetail;
