import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

const CLASS = 'DropdownButton';
interface DropdownButtonProps {
  buttonRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  styles?: StylesProps;
  children?: React.ReactNode;
}
const DropdownButtonDefaultProps = {};

function DropdownButton({ className, buttonRef, styles, onClick, children }: DropdownButtonProps & typeof DropdownButtonDefaultProps) {
  return (
    <StyledDropdownButton
      {...styles}
      className={classNames(CLASS, className)}
      onClick={onClick}
      ref={buttonRef}
    >
      {children}
    </StyledDropdownButton>
  );
}

DropdownButton.defaultProps = DropdownButtonDefaultProps;
export default DropdownButton;

// 스타일 컴포넌트
interface StylesProps {
  minWidth?: string;
  height?: string;
  cursor?: string;
  padding?: string;
}
const StyledDropdownButton = styled.div<StylesProps>`
  padding: ${p => p.padding};
  width: fit-content;
  min-width: ${p => p.minWidth};
  height: ${p => p.height};
  user-select: none;
  cursor: ${p => p.cursor ? p.cursor : 'pointer'};
  border-radius: 5px;
  text-align: center;

  &:hover {
    background-color: rgb(249, 249, 250);
  }
`