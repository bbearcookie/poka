import styled, { css } from 'styled-components';
import { TitleLabel } from '@component/label/titleLabel/_styles';
import { CardHeader } from '@component/card/basic/_styles';
import { ModalHook } from '@component/new_modal/useModal';
import { Position } from './Modal';
import { scrollbar } from '@util/_commonStyles';

// 모달 열고 닫을 때 위치 보정하기 위한 변수
const transformHeight = '3em';

export const Background = styled.div<{ hook: ModalHook }>`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1em;
  box-sizing: border-box;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  z-index: 99;

  transition: opacity 0.2s ease-out, visibility 0.2s ease-out;
  opacity: ${p => (p.hook.isOpen ? 1 : 0)};
  visibility: ${p => (p.hook.isOpen ? 'visible' : 'hidden')};
`;

export const Modal = styled.div<{ position: Position; isOpen: boolean }>`
  width: fit-content;
  height: fit-content;
  max-height: calc(100% - ${transformHeight});
  padding: 1em;
  overflow: auto;

  transition: transform 0.2s ease-out;
  transform: ${p => (p.isOpen ? 'translateY(0)' : `translateY(calc(-${transformHeight}))`)};

  // 모달 세로 위치 조정
  ${p => {
    switch (p.position.vertical) {
      case 'TOP':
        return css`
          align-self: flex-start;
        `;
      case 'CENTER':
        return css`
          align-self: center;
        `;
      case 'BOTTOM':
        return css`
          align-self: flex-end;
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

export const ModalHeader = styled(CardHeader)`
  display: flex;
  align-items: center;

  ${TitleLabel} {
    flex-grow: 1;
  }
`;
