import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

interface DropdownItemProps {
  className?: string;
  data?: unknown; // HTML 요소에 넣은 값을 자바스크립트로 가져와 써야할 때 사용
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}
const DropdownItemDefaultProps = {
  onClick: (e: React.MouseEvent) => e.stopPropagation()
};

function DropdownItem({ className, data, onClick, children }: DropdownItemProps & typeof DropdownItemDefaultProps) {
  return (
    <StyledItem
      className={classNames("DropdownItem", className)}
      data-data={data}
      onClick={onClick}
    >
      {children}
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