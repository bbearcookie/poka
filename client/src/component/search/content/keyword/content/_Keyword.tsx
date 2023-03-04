import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { StyledKeyword } from './_styles';

interface Props {
  category: string;
  text: string;
  handleClick?: () => void;
}

function Keyword({ category, text, handleClick }: Props) {

  const onClick = useCallback((e: React.MouseEvent ) => {
    e.stopPropagation(); // Modal 내부에서 추가된 Keyword 를 클릭하면 Modal 까지 이벤트가 전파되어 창이 닫히는 문제를 막기 위함
    handleClick && handleClick();
  }, [handleClick]);

  return (
    <StyledKeyword>
      <b>{category}: </b> <span>{text}</span>
      <FontAwesomeIcon
        className="icon"
        icon={faCircleXmark} size="lg"
        onClick={onClick}
      />
    </StyledKeyword>
  );
}

export default Keyword;