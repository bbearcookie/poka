import React, { useState, useCallback } from 'react';

export interface ModalHook {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

function useModal(): ModalHook {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 모달 ON / OFF
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close, errorMessage, setErrorMessage };
}

export default useModal;
