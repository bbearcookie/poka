import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const CLASS = 'SearchLabel';
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
    <StyledLabel className={CLASS}>
      <b>{category}: </b> <span>{text}</span>
      <FontAwesomeIcon
        className={`${CLASS}__close-icon`}
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

  .${CLASS}__close-icon {
    margin-left: 0.35em;
    color: #D1D5DB;
    cursor: pointer;

    &:hover { color: #b1b6bd; }
  }
`