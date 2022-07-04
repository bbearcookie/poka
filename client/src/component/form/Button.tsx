import React from 'react';
import classNames from 'classnames';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

// 스타일 컴포넌트 =======================
type ButtonTheme = 
  | "primary"
  | "primary-outlined"
  | "gray-outlined";

interface StyledButtonProps {
  theme: ButtonTheme;
  padding: string;
  iconMargin: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  padding: ${p => p.padding};
  border: 0;
  border-radius: 0.3rem;
  font-family: inherit;
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

  .left-icon {
    margin-right: ${p => p.iconMargin};
  }

  .right-icon {
    margin-left: ${p => p.iconMargin};
  }

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
      case "gray-outlined":
        return css`
          & {
            color: gray;
            border: 1px solid #E5E7EB;
            background-color: white;
            box-shadow: none;
          }

          &:hover {
            background-color: #fcfcfc;
          }
        `;
    }
  }}
`;

// 버튼 컴포넌트 =========================
interface ButtonProps {
  className?: string;
  theme: ButtonTheme;
  padding?: string;
  leftIcon?: IconDefinition;
  rightIcon?: IconDefinition;
  iconMargin?: string; // 아이콘 크기가 달라서 마진을 직접 줘야하는 경우에 부여
  children?: React.ReactNode;
}

const ButtonDefaultProps = {
  padding: '1em',
  iconMargin: '0.5em'
};

function Button({ className, theme, padding, leftIcon, rightIcon, iconMargin, children }: ButtonProps & typeof ButtonDefaultProps) {
  return (
    <StyledButton
      className={classNames("Button", className)}
      theme={theme}
      padding={padding}
      iconMargin={iconMargin}
    >
      {leftIcon && <FontAwesomeIcon className="left-icon" icon={leftIcon} /> }
      {children}
      {rightIcon && <FontAwesomeIcon className="right-icon" icon={rightIcon} /> }
    </StyledButton>
  );
}

Button.defaultProps = ButtonDefaultProps;

export default Button;