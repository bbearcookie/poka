import React from 'react';
import styled, { css } from 'styled-components';

export type LocationType =
  | 'TOP_LEFT' | 'TOP_CENTER' | 'TOP_RIGHT'
  | 'CENTER_LEFT' | 'CENTER_CENTER' | 'CENTER_RIGHT'
  | 'BOTTOM_LEFT' | 'BOTTOM_CENTER' | 'BOTTOM_RIGHT';

interface ModalProps {
  show: boolean;
  location?: LocationType;
  onClick?: () => void;
  children?: React.ReactNode;
}

const ModalDefaultProps = {
  location: 'CENTER_CENTER',
};

function Modal(p: ModalProps & typeof ModalDefaultProps) {
  return (
    <StyledModal show={p.show} onClick={p.onClick}>
      <StyledModalContent {...p} onClick={(e) => { e.stopPropagation() } }>
        {p.children}
      </StyledModalContent>
    </StyledModal>
  );
}

Modal.defaultProps = ModalDefaultProps;
export default Modal;

// 스타일 컴포넌트
const StyledModal = styled.section<ModalProps>`
  width: 100%; height: calc(100% + 3em);
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
        transform: translateY(-3em);
      `;
    }
  }}
`;

const StyledModalContent = styled.section<{location: string}>`
  margin: 1em;
  width: fit-content; height: fit-content;
  position: absolute;
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

  // 모달 위치 지정
  ${(p) => {
    switch (p.location) {
      case "TOP_LEFT":
        return css`
          & {
            left: 0; top: 0;
            transform: translateX(0) translateY(0);
          }
        `
      case "TOP_CENTER":
        return css`
          & {
            left: calc(50% - 1em); top: 0;
            transform: translateX(-50%) translateY(0);
          }
        `
      case "TOP_RIGHT":
        return css`
          & {
            right: 0; top: 0;
            transform: translateX(0) translateY(0);
          }
        `
      case "CENTER_LEFT":
        return css`
          & {
            left: 0; top: calc(50% - 3em);
            transform: translateX(0) translateY(-50%);
          }
        `
      case "CENTER_CENTER":
        return css`
          & {
            left: calc(50% - 1em); top: calc(50% - 3em);
            transform: translateX(-50%) translateY(-50%);
          }
        `
      case "CENTER_RIGHT":
        return css`
          & {
            right: 0; top: calc(50% - 3em);
            transform: translateX(0) translateY(-50%);
          }
        `
      case "BOTTOM_LEFT":
        return css`
          & {
            left: 0; bottom: 0;
            transform: translateX(0) translateY(-3em);
          }
        `
      case "BOTTOM_CENTER":
        return css`
          & {
            left: calc(50% - 1em); bottom: 0;
            transform: translateX(-50%) translateY(-3em);
          }
        `
      case "BOTTOM_RIGHT":
        return css`
          & {
            right: 0; bottom: 0;
            transform: translateX(0) translateY(-3em);
          }
        `
    }
  }}
`