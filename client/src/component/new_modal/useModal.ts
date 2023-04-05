import React, { useState, useCallback } from 'react';

interface Position {
  horizontal: 'LEFT' | 'CENTER' | 'RIGHT';
  vertical: 'TOP' | 'CENTER' | 'BOTTOM';
}

export interface ModalHook {
  position: Position;
  isOpened: boolean;
  errorMessage: string;
  open: () => void;
  close: () => void;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

function useModal(position: Position = { horizontal: 'CENTER', vertical: 'CENTER' }): ModalHook {
  const [isOpened, setIsOpened] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 모달 ON / OFF
  const open = useCallback(() => setIsOpened(true), []);
  const close = useCallback(() => setIsOpened(false), []);

  return { position, isOpened, errorMessage, open, close, setErrorMessage };
}

export default useModal;
