import React, { useState, useCallback } from "react";

export interface ModalHookType {
  show: boolean;
  open: () => void;
  close: () => void;
}

function useModal() {
  const [show, setShow] = useState(false);

  // 모달 ON / OFF
  const open = useCallback(() => setShow(true), []);
  const close = useCallback(() => setShow(false), []);

  const hook: ModalHookType = { show, open, close };
  return hook;
}

export default useModal;