import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalHook } from '@component/new_modal/useModal';
import { Background, Modal as StyledModal } from './_styles';

export interface Position {
  horizontal: 'LEFT' | 'CENTER' | 'RIGHT';
  vertical: 'TOP' | 'CENTER' | 'BOTTOM';
}

interface Props {
  hook: ModalHook;
  position?: Position;
  children?: React.ReactNode;
}

function Modal({ hook, position = { horizontal: 'CENTER', vertical: 'CENTER' }, children }: Props) {
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
    <>
      {createPortal(
        <Background hook={hook}>
          <StyledModal ref={ref} position={position}>
            {children}
          </StyledModal>
        </Background>,
        document.getElementById('modal') || document.body
      )}
    </>
  );
}

export default Modal;
