import React from 'react';
import styled from 'styled-components';
import * as PopperJS from '@popperjs/core';

interface Props {
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
const DefaultProps = {};

function DropdownMenu({ menuRef, popper, styles, children }: Props) {
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

export default DropdownMenu;

// 스타일 컴포넌트
interface StylesProps {
  width?: string;
  minWidth?: string;
  maxHeight?: string;
}
const StyledDropdownMenu = styled.div<StylesProps>`
  padding: 0.5em 0;
  width: ${p => p.width};
  min-width: ${p => p.minWidth};
  max-height: ${p => p.maxHeight};
  text-align: center;
  background-color: white;
  z-index: 100;
  border: 2px solid #E5E7EB;
  border-radius: 10px;
  overflow-y: auto;

  // 스크롤 바 스타일 지정
  & {
    &::-webkit-scrollbar {
      width: 0.5em;  /* 스크롤바의 너비 */
    }
    
    &::-webkit-scrollbar-thumb {
      height: 30%; /* 스크롤바의 길이 */
      background: rgb(43, 56, 82); /* 스크롤바의 색상 */
      border-radius: 0.7em;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(33, 122, 244, .1);  /* 스크롤바 뒷 배경 색상 */
    }
  }
`