import React, { useCallback } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { DropdownHookType } from '@hook/useDropdown';

const CLASS = 'DropdownButton';
interface DropdownButtonProps {
  hook?: DropdownHookType;
  className?: string;
  type?: 'hover' | 'click';
  styles?: StylesProps;
  children?: React.ReactNode;
}
const DropdownButtonDefaultProps = {
  type: 'click'
};

function DropdownButton(p: DropdownButtonProps & typeof DropdownButtonDefaultProps) {
  return (
    <StyledDropdownButton
      {...StylesDefaultProps} {...p.styles} {...p}
      className={classNames(CLASS, p.className)}
      onClick={p.type === 'click' ? () => p.hook?.toggle() : undefined}
    >
      {p.children}
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