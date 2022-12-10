import React from 'react';
import styled from 'styled-components';
import * as PopperJS from '@popperjs/core';

interface DropdownMenuProps {
  menuRef?: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  popper?: {
    styles: {
        [key: string]: React.CSSProperties;
    };
    attributes: {
        [key: string]: {
            [key: string]: string;
        } | undefined;
    };
    state: PopperJS.State | null;
    update: (() => Promise<Partial<PopperJS.State>>) | null;
    forceUpdate: (() => void) | null;
  }
  styles?: StylesProps;
  children?: React.ReactNode;
}
const DropdownMenuDefaultProps = {};

function DropdownMenu({ menuRef, popper, styles, children }: DropdownMenuProps & typeof DropdownMenuDefaultProps) {
  return (
    <StyledDropdownMenu
      {...styles}
      ref={menuRef}
      style={popper?.styles.popper}
      {...popper?.attributes.popper}
    >
      {children}
    </StyledDropdownMenu>
  );
}

DropdownMenu.defaultProps = DropdownMenuDefaultProps;
export default DropdownMenu;

// 스타일 컴포넌트
interface StylesProps {
  width?: string;
}
const StyledDropdownMenu = styled.div<StylesProps>`
  padding: 0.5em 0;
  width: ${p => p.width};
  text-align: center;
  background-color: white;
  z-index: 10;
  border: 2px solid #E5E7EB;
  border-radius: 10px;
`