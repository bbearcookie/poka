import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

const CLASS = 'DropdownButton';
interface DropdownButtonProps {
  buttonRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  className?: string;
  styles?: StylesProps;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}
const DropdownButtonDefaultProps = {};

function DropdownButton({ className, buttonRef, styles, onClick, children }: DropdownButtonProps & typeof DropdownButtonDefaultProps) {
  return (
    <StyledDropdownButton
      {...StylesDefaultProps} {...styles}
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
  padding?: string;
}
const StylesDefaultProps = {};
const StyledDropdownButton = styled.div<StylesProps & typeof StylesDefaultProps>`
  padding: ${p => p.padding};
  width: fit-content;
  user-select: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: rgb(249, 249, 250);
  }
`