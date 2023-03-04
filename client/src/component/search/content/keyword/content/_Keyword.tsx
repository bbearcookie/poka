import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { StyledKeyword } from './_styles';

interface Props {
  category: string;
  text: string;
  handleClick?: () => void;
}

function Keyword({ category, text, handleClick }: Props) {
  return (
    <StyledKeyword>
      <b>{category}: </b> <span>{text}</span>
      <FontAwesomeIcon
        className="icon"
        icon={faCircleXmark} size="lg"
        onClick={handleClick}
      />
    </StyledKeyword>
  );
}

export default Keyword;