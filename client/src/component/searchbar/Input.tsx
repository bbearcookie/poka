import React from 'react';
import styled from 'styled-components';

interface InputProps {
  type: React.HTMLInputTypeAttribute;
  name: string;
  value?: any;
  autoComplete?: string;
  maxLength?: number;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
}
const InputDefaultProps = {};

function Input(p: InputProps & typeof InputDefaultProps) {
  return (
    <StyledInput {...p}>
      {p.children}
    </StyledInput>
  );
}

Input.defaultProps = InputDefaultProps;
export default Input;

const StyledInput = styled.input<InputProps>`
  padding: 0 0.5em;
  width: 100%;
  height: 100%;
  border: 1px solid #E5E7EB;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border: 1px solid rgb(206, 28, 73);
    box-shadow: 0px 0px 1px 1px rgb(206, 28, 73);
    transition:
      border 0.25s,
      box-shadow 0.25s;
  }

  // 크롬 자동완성시 배경색 제거
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-transition: background-color 9999s ease-out;
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
  }
`;