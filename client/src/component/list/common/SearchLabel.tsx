import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

interface Props {
  id?: number;
  handleRemove?: (id: number) => void;
  category?: string;
  text?: string;
  children?: React.ReactNode;
}
const DefaultProps = {
  id: -1,
  handleRemove: (id: number) => {}
};

function SearchLabel({ id = DefaultProps.id, category, text, handleRemove = DefaultProps.handleRemove, children }: Props) {
  return (
    <StyledLabel>
      <b>{category}: </b> <span>{text}</span>
      <FontAwesomeIcon
        className="icon"
        icon={faCircleXmark} size="lg"
        onClick={(e) => { e.stopPropagation(); handleRemove(id) }}
      />
    </StyledLabel>
  );
}

export default SearchLabel;

// 스타일 컴포넌트
const StyledLabel = styled.span`
  padding: 0.75em 1em;
  border: 1px solid #D1D5DB;
  border-radius: 50px;
  transition: background 0.2s;

  .icon {
    margin-left: 0.35em;
    color: #D1D5DB;
    cursor: pointer;

    &:hover { color: #b1b6bd; }
  }
`