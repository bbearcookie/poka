import React, { useCallback } from 'react';
import { State, Action, FormType } from '@component/shipping/address/editor/reducer';
import Name from './content/Name';
import Recipient from './content/Recipient';
import Contact from './content/Contact';
import Address from './content/address/Index';
import Requirement from './content/requirement/Index';
import { StyledAddressEditor } from './_styles';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  showName?: boolean;
  children?: React.ReactNode;
}

function AddressEditor({ state, dispatch, showName = true, children }: Props) {
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

  // input 포커스 해제시 유효성 검사
  const blurInput = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      dispatch({ type: 'SET_MESSAGE', target: e.target.name as keyof FormType, value: '' });
    },
    [dispatch]
  );

  return (
    <StyledAddressEditor>
      {showName && (
        <Name state={state} dispatch={dispatch} changeInput={changeInput} blurInput={blurInput} />
      )}
      <Recipient
        state={state}
        dispatch={dispatch}
        changeInput={changeInput}
        blurInput={blurInput}
      />
      <Contact state={state} dispatch={dispatch} changeInput={changeInput} blurInput={blurInput} />
      <Address state={state} dispatch={dispatch} changeInput={changeInput} blurInput={blurInput} />
      <Requirement
        state={state}
        dispatch={dispatch}
        changeInput={changeInput}
        blurInput={blurInput}
      />
      {children}
    </StyledAddressEditor>
  );
}

export default AddressEditor;