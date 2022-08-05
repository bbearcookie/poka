import React, { useEffect } from 'react';
import styled from 'styled-components';
import { DropdownHookType } from '@hook/useDropdown';
import classNames from 'classnames';

const CLASS = 'Dropdown';
interface DropdownProps {
  hook: DropdownHookType;
  className?: string;
  children?: React.ReactNode;
  styles?: StylesProps;
}
const DropdownDefaultProps = {};

function Dropdown(p: DropdownProps & typeof DropdownDefaultProps) {

  // 드롭다운의 바깥 영역이 클릭되면 드롭다운 닫음
  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      p.hook.close();
    }

    document.body.addEventListener('click', closeDropdown);
    return () => document.body.removeEventListener('click', closeDropdown);
  }, [p.hook]);

  return (
    <StyledDropdown
      {...StylesDefaultProps} {...p.styles} {...p}
      className={classNames(CLASS, p.className)}
    >
      {p.children}
    </StyledDropdown>
  );
}

Dropdown.defaultProps = DropdownDefaultProps;
export default Dropdown;

// 스타일 컴포넌트
interface StylesProps {}
const StylesDefaultProps = {};
const StyledDropdown = styled.div<StylesProps & typeof StylesDefaultProps>`
  position: relative;
`;