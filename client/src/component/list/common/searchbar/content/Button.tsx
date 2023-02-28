import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}
const DefaultProps = {};
function Button(p: Props) {
  return (
    <StyledButton {...p}>
      <FontAwesomeIcon className="icon" icon={faSearch} size="lg" />
    </StyledButton>
  );
}

export default Button;

// 스타일 컴포넌트
const StyledButton = styled.button`
  padding: 0 1.25rem;
  height: 100%;
  color: white;
  background-color: #EC1B5A;
  border: transparent;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;

  &:active {
    .icon {
      position: relative;
      top: 1px;
    }
  }

  &:hover {
    background-color: #c40e45;
  }
`;