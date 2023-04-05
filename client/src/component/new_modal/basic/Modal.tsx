import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalHook } from '@component/new_modal/useModal';
import { Background, Modal as StyledModal } from './_styles';

export interface Props {
  className?: string;
  hook: ModalHook;
  children?: React.ReactNode;
}

function Modal({ className, hook, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // 모달의 바깥 영역이 클릭되면 모달을 닫는다
  useEffect(() => {
    const closeModal = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        hook.close();
      }
    };

    document.body.addEventListener('mousedown', closeModal);
    return () => document.body.removeEventListener('mousedown', closeModal);
  }, [hook]);

  return (
    <Background hook={hook}>
      <StyledModal className={className} ref={ref} hook={hook}>
        {children}
      </StyledModal>
    </Background>
  );
}

export default Modal;
