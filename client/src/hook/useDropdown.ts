import React, { useState, useCallback } from "react";

export interface DropdownHookType {
  show: boolean;
  buttonElement: HTMLElement | null;
  menuElement: HTMLElement | null;
  buttonRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  menuRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

function useDropdown() {
  const [show, setShow] = useState(false);
  const [buttonElement, buttonRef] = useState<HTMLElement | null>(null);
  const [menuElement, menuRef] = useState<HTMLElement | null>(null);

  // 모달 ON / OFF
  const open = useCallback(() => setShow(true), []);
  const close = useCallback(() => setShow(false), []);
  const toggle = useCallback(() => setShow(!show), [show]);

  const hook: DropdownHookType = {
    show, buttonElement, menuElement, buttonRef, menuRef, open, close, toggle
  };
  return hook;
}

export default useDropdown;