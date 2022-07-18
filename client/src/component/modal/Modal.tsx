import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  children?: React.ReactNode;
}

const ModalDefaultProps = {};

function Modal({ children }: ModalProps & typeof ModalDefaultProps) {
  return (
    <StyledModal>
      <StyledModalContent>
        {children}
      </StyledModalContent>
    </StyledModal>
  );
}

Modal.defaultProps = ModalDefaultProps;

export default Modal;

// 스타일 컴포넌트
const StyledModal = styled.section`
  width: 100%; height: 100%;
  position: fixed;
  top: 0; left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  word-break: break-all;
  z-index: 99;
`;

const StyledModalContent = styled.section`
  margin: 1em;
  width: fit-content; height: fit-content;
  position: absolute;
  max-height: 90%;
  top: calc(50%); left: calc(50% - 1em);
  transform: translateX(-50%) translateY(-50%);
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
`