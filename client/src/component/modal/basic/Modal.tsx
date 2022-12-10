import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { ModalHookType } from '@hook/useModal';

export type LocationType = {
  horizontal: 'LEFT' | 'CENTER' | 'RIGHT';
  vertical: 'TOP' | 'CENTER' | 'BOTTOM';
}

export interface ModalProps {
  hook: ModalHookType;
  location?: LocationType;
  styles?: StylesProps;
  children?: React.ReactNode;
}
const ModalDefaultProps = {
  location: {
    horizontal: 'CENTER',
    vertical: 'CENTER'
  }
};
function Modal({ hook, location, styles, children }: ModalProps & typeof ModalDefaultProps) {
  const ref = useRef<HTMLElement>(null);

  // 모달의 바깥 영역이 클릭되면 모달 닫음
  useEffect(() => {
    const closeModal = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as unknown as Node)) {
        hook.close();
      }
    }

    document.body.addEventListener('click', closeModal);
    return () => document.body.removeEventListener('click', closeModal);
  }, [hook]);

  return (
    <StyledModalWrapper show={hook.show}>
      <StyledModalContent
        location={location}
        ref={ref}
        {...styles}
      >
        {children}
      </StyledModalContent>
    </StyledModalWrapper>
  );
}

Modal.defaultProps = ModalDefaultProps;
export default Modal;

// 스타일 컴포넌트
const exceedHeight = '3em'; // 모달 열고 닫을때 height 변화 애니메이션만큼 요소 보정하기 위한 변수
const StyledModalWrapper = styled.section<{show: boolean}>`
  padding: 1em;
  padding-bottom: calc(1em + ${exceedHeight});
  box-sizing: border-box;
  width: 100%; height: calc(100% + ${exceedHeight});
  display: flex;
  position: fixed;
  top: 0; left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  word-break: break-all;
  z-index: 99;
  transition:
    opacity 0.2s ease-out,
    visibility 0.2s ease-out,
    transform 0.2s ease-out;

  ${(p) => {
    if (p.show) {
      return css`
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      `;
    } else {
      return css`
        opacity: 0;
        visibility: hidden;
        transform: translateY(calc(-1 * ${exceedHeight}));
      `;
    }
  }}
`;

export interface StylesProps {
  width?: string;
  maxWidth?: string;
  minWidth?: string;
  location?: LocationType;
}
const StyledModalContent = styled.section<StylesProps>`
  width: ${p => p.width};
  max-width: ${p => p.maxWidth};
  min-width: ${p => p.minWidth};
  max-height: 90%;
  overflow: auto;

  // 스크롤 바 스타일 지정
  & {
    &::-webkit-scrollbar {
      width: 0.5em; /* 세로 스크롤바의 너비 */
      height: 0.5em; /* 가로 스크롤바의 너비 */
    }
    
    &::-webkit-scrollbar-thumb {
      height: 20%; /* 스크롤바의 길이 */
      background: rgb(43, 56, 82); /* 스크롤바의 색상 */
      border-radius: 0.3em;
    }
  }

  // 모달 세로 위치 조정
  ${(p) => {
    switch (p.location?.vertical) {
      case 'TOP':
        return;
      case 'CENTER':
        return css`
          & { margin-top: auto; margin-bottom: auto; }
        `
      case 'BOTTOM':
        return css`
          & { margin-top: auto; }
        `
    }
  }}

  // 모달 가로 위치 조정
  ${(p) => {
    switch (p.location?.horizontal) {
      case 'LEFT':
        return;
      case 'CENTER':
        return css`
          & { margin-left: auto; margin-right: auto; }
        `
      case 'RIGHT':
        return css`
          & { margin-left: auto; }
        `
    }
  }}
`