import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface IconButtonProps {
  icon: IconDefinition;
  onClick?: () => void;
  children?: React.ReactNode;
}

const IconButtonDefaultProps = {};

function IconButton(p: IconButtonProps & typeof IconButtonDefaultProps) {
  return (
    <StyledIconButton {...p} className="IconButton" onClick={p.onClick}>
      <FontAwesomeIcon icon={p.icon} />
    </StyledIconButton>
  );
}

IconButton.defaultProps = IconButtonDefaultProps;
export default IconButton;

// 스타일 컴포넌트
const StyledIconButton = styled.div`
  color: gray;
  padding: 0.5rem;
  border-radius: 0.3rem;
  transition: all 0.5s;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: inherit;
    background-color: rgb(249, 249, 250);
  }
`