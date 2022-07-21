import React, { useState, useCallback } from "react";

export interface ModalHookType {
  show: boolean;
  open: () => void;
  close: () => void;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

function useModal() {
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 모달 ON / OFF
  const open = useCallback(() => setShow(true), []);
  const close = useCallback(() => setShow(false), []);

  const hook: ModalHookType = { show, open, close, errorMessage, setErrorMessage };
  return hook;
}

export default useModal;