import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface ButtonProps {
  children?: React.ReactNode;
}
const ButtonDefaultProps = {};

function Button(p: ButtonProps & typeof ButtonDefaultProps) {
  return (
    <StyledButton {...p}>
      <FontAwesomeIcon className="icon" icon={faSearch} size="lg" />
    </StyledButton>
  );
}

Button.defaultProps = ButtonDefaultProps;
export default Button;

const StyledButton = styled.button<ButtonProps>`
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