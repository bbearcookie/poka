import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type ButtonTheme =
  | 'primary'
  | 'primary-outlined'
  | 'gray'
  | 'gray-outlined'
  | 'danger'
  | 'danger-outlined'
  | 'pink'
  | 'pink-outlined'
  | 'mint'
  | 'mint-outlined';

interface Props {
  buttonTheme?: ButtonTheme;
  leftIcon?: IconDefinition;
  rightIcon?: IconDefinition;
  iconMargin?: string;
}

function Button({
  buttonTheme,
  iconMargin,
  leftIcon,
  rightIcon,
  children,
  ...rest
}: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & Props) {
  return (
    <button type="button" {...rest}>
      {leftIcon && <FontAwesomeIcon icon={leftIcon} />}
      {children}
      {rightIcon && <FontAwesomeIcon icon={rightIcon} />}
    </button>
  );
}

export default styled(Button)<Props>`
  padding: 1em;
  display: flex;
  align-items: center;
  gap: ${p => p.iconMargin};
  border: 1px solid transparent;
  border-radius: 0.3rem;
  box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
  font-family: inherit;
  font-size: 0.9em;
  cursor: pointer;
  user-select: none;
  transition: background-color border 0.3s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    position: relative;
    top: 1px;
    box-shadow: none;
    transition: box-shadow 0.1s;
  }

  ${p => {
    switch (p.buttonTheme) {
      case 'primary':
        return css`
          & {
            color: white;
            background-color: rgb(80, 72, 229);
            border: 1px solid rgb(80, 72, 229);
          }

          &:hover:not(:disabled) {
            background-color: rgb(56, 50, 160);
            border: 1px solid rgb(56, 50, 160);
          }
        `;
      case 'primary-outlined':
        return css`
          & {
            color: rgb(80, 72, 229);
            border: 1px solid rgb(167, 163, 242);
            background-color: white;
            box-shadow: none;
          }

          &:hover:not(:disabled) {
            background-color: rgba(248, 248, 254, 100);
          }
        `;
      case 'gray':
        return css`
          & {
            color: white;
            background-color: #6c757d;
            border: 1px solid gray;
          }

          &:hover:not(:disabled) {
            background-color: rgb(92, 99, 106);
            border: 1px solid rgb(92, 99, 106);
          }
        `;
      case 'gray-outlined':
        return css`
          & {
            color: #6c757d;
            border: 1px solid #e5e7eb;
            background-color: white;
            box-shadow: none;
          }

          &:hover:not(:disabled) {
            background-color: #fcfcfc;
          }
        `;
      case 'danger':
        return css`
          & {
            color: white;
            background-color: #d14343;
            border: 1px solid #d14343;
          }

          &:hover:not(:disabled) {
            background-color: #ad3838;
            border: 1px solid #ad3838;
          }
        `;
      case 'danger-outlined':
        return css`
          & {
            color: #d14343;
            border: 1px solid #d14343;
            background-color: white;
            box-shadow: none;
          }

          &:hover:not(:disabled) {
            background-color: rgb(248, 248, 254);
          }
        `;
      case 'pink':
        return css`
          & {
            color: white;
            background-color: #e95188;
            border: 1px solid #e95188;
          }

          &:hover:not(:disabled) {
            background-color: #d14377;
            border: 1px solid #d14377;
          }
        `;
      case 'mint':
        return css`
          & {
            color: white;
            background-color: #14b8a6;
            border: 1px solid #14b8a6;
          }

          &:hover:not(:disabled) {
            background-color: #1aab9a;
            border: 1px solid #1aab9a;
          }
        `;
    }
  }}
`;
