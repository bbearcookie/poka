import React, { useCallback } from 'react';
import styled from 'styled-components';
import { State, Action, FormType } from '@component/address/editor/reducer';
import Name from './content/Name';
import Recipient from './content/Recipient';
import Contact from './content/Contact';
import Address from './content/Address';
import Requirement from './content/Requirement';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  showName?: boolean;
  children?: React.ReactNode;
}

function AddressEditor({ state, dispatch, showName = true, children }: Props) {

  // input 상태 값 변경
  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_FORM_DATA', target: e.target.name as keyof FormType, value: e.target.value  });
  }, [dispatch]);

  // input 포커스 해제시 유효성 검사
  const blurInput = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_MESSAGE', target: e.target.name as keyof FormType, value: '' });
  }, [dispatch]);

  return (
    <StyledWrapper className="AddressEditor">
      {showName && <Name state={state} dispatch={dispatch} changeInput={changeInput} blurInput={blurInput} />}
      <Recipient state={state} dispatch={dispatch} changeInput={changeInput} blurInput={blurInput} />
      <Contact state={state} dispatch={dispatch} changeInput={changeInput} blurInput={blurInput} />
      <Address state={state} dispatch={dispatch} changeInput={changeInput} blurInput={blurInput} />
      <Requirement state={state} dispatch={dispatch} changeInput={changeInput} blurInput={blurInput} />
      {children}
    </StyledWrapper>
  );
}

export default AddressEditor;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5em;
  border-bottom: 1px solid #E5E7EB;
`

export const InputLine = styled.section`
  display: flex;
  margin-bottom: 0.5em;
  
  @media screen and (max-width: 50rem) {
    flex-direction: column;
  }
`

export const LabelSection = styled.section`
  width: 9.5em;
  height: 2.5em;
  line-height: 2em;
  flex-shrink: 0;

  .icon { margin-right: 0.25em; }
`

export const InputSection = styled.section`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`