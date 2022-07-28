import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

// 인풋 컴포넌트
const CLASS = 'Input';

interface InputProps {
  type: React.HTMLInputTypeAttribute;
  name: string;
  className?: string;
  display?: string;
  width?: string;
  maxWidth?: string;
  height?: string;
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  border?: string;
  activeBorder?: string;
  activeBoxShadow?: string;
  color?: string;
  placeholderColor?: string;
  backgroundColor?: string;
  textAlign?: string;
  value?: any;
  autoComplete?: string;
  maxLength?: number;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

const InputDefaultProps = {
  border: '1px solid hsl(222, 9%, 78%)',
  activeBorder: '1px solid rgb(206, 28, 73)',
  activeBoxShadow: '0px 0px 1px 1px rgb(206, 28, 73)',
  autoComplete: 'on',
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => {},
};

function Input(p: InputProps & typeof InputDefaultProps) {  
  return (
    <StyledInputWrapper {...p} className={classNames(CLASS, p.className)}>
      <input
        type={p.type}
        name={p.name}
        value={p.value}
        placeholder={p.placeholder}
        maxLength={p.maxLength}
        autoComplete={p.autoComplete}
        onChange={p.onChange}
        onBlur={p.onBlur}
      />
      {p.children}
      </StyledInputWrapper>
  );
}

Input.defaultProps = InputDefaultProps;
export default Input;

// 스타일 컴포넌트
const StyledInputWrapper = styled.div<InputProps>`
  display: ${p => p.display};
  width: ${p => p.width};
  margin: ${p => p.margin};
  margin-top: ${p => p.marginTop};
  margin-bottom: ${p => p.marginBottom};
  margin-left: ${p => p.marginLeft};
  margin-right: ${p => p.marginRight};
  
  input {
    width: ${p => p.width};
    max-width: ${p => p.maxWidth};
    height: ${p => p.height};
    padding: 0 0.5em;
    box-sizing: border-box;
    color: ${p => p.color};
    background-color: ${p => p.backgroundColor};
    border: ${p => p.border};
    border-radius: 5px;
    font-family: inherit;
    font-size: 1rem;
    text-align: ${p => p.textAlign};

    &::placeholder { color: ${p => p.placeholderColor} }
    &:focus {
      outline: none;
      border: ${p => p.activeBorder};
      box-shadow: ${p => p.activeBoxShadow};
      transition: all 0.25s;
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
  }
`;