import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

const CLASS = 'DropdownItem';
interface DropdownItemProps {
  className?: string;
  data?: unknown;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}
const DropdownItemDefaultProps = {
  onClick: (e: React.MouseEvent) => e.stopPropagation()
};

function DropdownItem(p: DropdownItemProps & typeof DropdownItemDefaultProps) {
  return (
    <StyledItem
      {...p}
      className={classNames(CLASS, p.className)}
    >
      {p.children}
    </StyledItem>
  );
}

DropdownItem.defaultProps = DropdownItemDefaultProps;
export default DropdownItem;

// 스타일 컴포넌트
const StyledItem = styled.div`
  padding: 0.5em 1em;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: rgb(247, 248, 248);
  }
`;