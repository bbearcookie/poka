import React from 'react';
import classNames from 'classnames';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

type ButtonTheme = 
| "primary"
| "primary-outlined"
| "gray"
| "gray-outlined"
| "danger"
| "danger-outlined"


// 버튼 컴포넌트 =========================
const CLASS = 'Button';

interface ButtonProps {
  theme: ButtonTheme;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  padding?: string;
  leftIcon?: IconDefinition;
  rightIcon?: IconDefinition;
  iconMargin?: string; // 아이콘 크기가 달라서 마진을 직접 줘야하는 경우에 부여
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

const ButtonDefaultProps = {
  type: 'button',
  padding: '1em',
  iconMargin: '0.5em'
};

function Button(p: ButtonProps & typeof ButtonDefaultProps) {
  return (
    <StyledButton {...p} className={classNames(CLASS, p.className)}>
      {p.leftIcon && <FontAwesomeIcon className={`${CLASS}__left-icon`} icon={p.leftIcon} /> }
      {p.children}
      {p.rightIcon && <FontAwesomeIcon className={`${CLASS}__right-icon`} icon={p.rightIcon} /> }
    </StyledButton>
  );
}

Button.defaultProps = ButtonDefaultProps;
export default Button;

// 스타일 컴포넌트 =======================
const StyledButton = styled.button<ButtonProps>`
  margin: ${p => p.margin};
  margin-top: ${p => p.marginTop};
  margin-bottom: ${p => p.marginBottom};
  margin-left: ${p => p.marginLeft};
  margin-right: ${p => p.marginRight};
  padding: ${p => p.padding};
  font-family: inherit;
  border: 0;
  border-radius: 0.3rem;
  box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
  cursor: pointer;
  user-select: none;
  transition: background-color border 0.3s;

  &:active {
    position: relative;
    top: 1px;
    box-shadow: none;
    transition: box-shadow 0.1s;
  }

  .${CLASS}__left-icon { margin-right: ${p => p.iconMargin}; }
  .${CLASS}__right-icon { margin-left: ${p => p.iconMargin}; }

  ${(p) => {
    switch (p.theme) {
      case "primary":
        return css`
          & {
            color: white;
            background-color: rgb(80, 72, 229);
            border: 1px solid rgb(80, 72, 229);
          }

          &:hover {
            background-color: rgb(56, 50, 160);
            border: 1px solid rgb(56, 50, 160);
          }
        `;
      case "primary-outlined":
        return css`
          & {
            color: rgb(80, 72, 229);
            border: 1px solid rgb(167, 163, 242);
            background-color: white;
            box-shadow: none;
          }

          &:hover {
            background-color: rgba(248, 248, 254, 100);
          }
        `;
      case "gray":
        return css`
          & {
            color: white;
            background-color: #6C757D;
            border: 1px solid gray;
          }

          &:hover {
            background-color: rgb(92, 99, 106);
            border: 1px solid rgb(92, 99, 106);
          }
        `;
      case "gray-outlined":
        return css`
          & {
            color: #6C757D;
            border: 1px solid #E5E7EB;
            background-color: white;
            box-shadow: none;
          }

          &:hover {
            background-color: #fcfcfc;
          }
        `;
      case "danger":
        return css`
          & {
            color: white;
            background-color: #D14343;
            border: 1px solid #D14343;
          }

          &:hover {
            background-color: #ad3838;
            border: 1px solid #ad3838;
          }
        `;
      case "danger-outlined":
        return css`
          & {
            color: #D14343;
            border: 1px solid #D14343;
            background-color: white;
            box-shadow: none;
          }

          &:hover {
            background-color: rgb(248, 248, 254);
          }
        `;
    }
  }}
`;