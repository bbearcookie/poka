import React, { useState, useCallback } from "react";

export interface DropdownHookType {
  show: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

function useDropdown() {
  const [show, setShow] = useState(false);

  // 모달 ON / OFF
  const open = useCallback(() => setShow(true), []);
  const close = useCallback(() => setShow(false), []);
  const toggle = useCallback(() => setShow(!show), [show]);

  const hook: DropdownHookType = { show, open, close, toggle };
  return hook;
}

export default useDropdown;