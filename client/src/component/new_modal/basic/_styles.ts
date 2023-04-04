import styled, { css } from 'styled-components';
import { ModalHook } from '@component/new_modal/useModal';
import { Position } from './Modal';
import { scrollbar } from '@util/_commonStyles';

// 모달 열고 닫을 때 위치 보정하기 위한 변수
const transformHeight = '3em';

export const Background = styled.div<{ hook: ModalHook }>`
  width: 100%;
  height: calc(100% + ${transformHeight});
  padding: 1em;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  z-index: 99;
  transition: opacity 0.2s ease-out, visibility 0.2s ease-out, transform 0.2s ease-out;

  opacity: ${p => (p.hook.isOpen ? 1 : 0)};
  visibility: ${p => (p.hook.isOpen ? 'visible' : 'hidden')};
  transform: ${p => (p.hook.isOpen ? 'translateY(0)' : `translateY(calc(-${transformHeight}))`)};
`;

export const Modal = styled.div<{ position: Position }>`
  width: fit-content;
  max-height: 90%;
  overflow: auto;

  // 모달 세로 위치 조정
  ${p => {
    switch (p.position.vertical) {
      case 'TOP':
        return css``;
      case 'CENTER':
        return css`
          margin-top: auto;
          margin-bottom: auto;
        `;
      case 'BOTTOM':
        return css`
          margin-top: auto;
        `;
    }
  }}

  // 모달 가로 위치 조정
  ${p => {
    switch (p.position.horizontal) {
      case 'LEFT':
        return css``;
      case 'CENTER':
        return css`
          margin-left: auto;
          margin-right: auto;
        `;
      case 'RIGHT':
        return css`
          margin-left: auto;
        `;
    }
  }}

  ${scrollbar}
`;
