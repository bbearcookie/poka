import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

interface Props {
  className?: string;
  styles?: StylesProps;
  children?: React.ReactNode;
}
const DefaultProps = {};

function CardList({ className, styles, children }: Props) {
  return (
    <StyledCardList className={classNames("CardList", className)} {...styles}>
      {children}
    </StyledCardList>
  );
}

export default CardList;

// 스타일 컴포넌트
export interface StylesProps {

}
const StyledCardList = styled.ul<StylesProps>`
  margin: 0; padding: 0;
`