import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DropdownHookType } from '@hook/useDropdown';

interface Props {
  hook: DropdownHookType;
  className?: string;
  children?: React.ReactNode;
}
const DefaultProps = {};

function Dropdown({ hook, className, children }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  // 드롭다운의 바깥 영역이 클릭되면 드롭다운 닫음
  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as unknown as Node)) {
        hook.close();
      }
    }

    document.body.addEventListener('click', closeDropdown);
    return () => document.body.removeEventListener('click', closeDropdown);
  }, [hook]);

  return (
    <div className={classNames("Dropdown", className)} ref={ref}>
      {children}
    </div>
  );
}

export default Dropdown;