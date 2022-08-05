import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { DropdownHookType } from '@hook/useDropdown';

interface DropdownMenuProps {
  hook: DropdownHookType;
  className?: string;
  styles?: StylesProps;
  children?: React.ReactNode;
}
const DropdownMenuDefaultProps = {};

function DropdownMenu(p: DropdownMenuProps & typeof DropdownMenuDefaultProps) {
  return (
    <StyledDropdownMenu
      {...StylesDefaultProps} {...p.styles}
      {...p}
      show={p.hook.show}
      onClick={e => e.stopPropagation()}
    >
      {p.children}
    </StyledDropdownMenu>
  );
}

DropdownMenu.defaultProps = DropdownMenuDefaultProps;
export default DropdownMenu;

// 스타일 컴포넌트
interface StylesProps {
  show?: boolean;
  width?: string;
}
const StylesDefaultProps = {};
const StyledDropdownMenu = styled.div<StylesProps & typeof StylesDefaultProps>`
  width: ${p => p.width};
  padding: 0.5em 0;
  background-color: white;
  position: absolute;
  z-index: 10;
  border: 2px solid #E5E7EB;
  border-radius: 10px;
  overflow: hidden;

  ${(p) => {
    if (p.show) {
      return css`
        opacity: 1;
        visibility: visible;
      `;
    } else {
      return css`
        opacity: 0;
        visibility: hidden;
      `;
    }
  }}
`