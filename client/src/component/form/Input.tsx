import React, { forwardRef } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

// 인풋 컴포넌트
interface Props {
  type?: React.HTMLInputTypeAttribute;
  name?: string;
  className?: string;
  value?: string | number | readonly string[] | undefined;
  autoComplete?: string;
  readOnly?: boolean;
  maxLength?: number;
  min?: string | number;
  placeholder?: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  styles?: StylesProps;
  children?: React.ReactNode;
}
const DefaultProps = {
  autoComplete: 'off',
};

const Input = forwardRef<HTMLInputElement, Props>((
  {
    type, name, className, value,
    autoComplete = DefaultProps.autoComplete,
    readOnly, maxLength, min, placeholder,
    onClick, onChange, onBlur,
    styles, children
  }, ref) => {
    return (
      <StyledInputWrapper className={classNames('Input', className)} {...styles}>
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete={autoComplete}
          onClick={onClick}
          onChange={onChange}
          onBlur={onBlur}
          readOnly={readOnly}
          min={min}
          ref={ref}
        />
        {children}
      </StyledInputWrapper>
    )
});

export default Input;

// 스타일 컴포넌트
interface StylesProps {
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
}
const StyledInputWrapper = styled.div<StylesProps>`
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
    padding: 0 0.7em;
    box-sizing: border-box;
    color: ${p => p.color};
    background-color: ${p => p.backgroundColor};
    border: ${p => p.border ? p.border : '1px solid hsl(222, 9%, 78%)'};
    border-radius: 5px;
    font-family: inherit;
    font-size: 1em;
    text-align: ${p => p.textAlign};

    &::placeholder { color: ${p => p.placeholderColor} }
    &:focus {
      outline: none;
      border: ${p => p.activeBorder ? p.activeBorder : '1px solid rgb(206, 28, 73)'};
      box-shadow: ${p => p.activeBoxShadow ? p.activeBoxShadow : '0px 0px 1px 1px rgb(206, 28, 73)'};
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