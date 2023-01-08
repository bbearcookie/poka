import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

interface Props {
  className?: string;
  styles?: StylesProps;
  children?: React.ReactNode;
}
const DefaultProps = {};

function CardListItem({ className, styles, children }: Props) {
  return (
    <StyledCardListItem className={classNames("CardListItem", className)} {...styles}>
      {children}
    </StyledCardListItem>
  );
}

export default CardListItem;

// 스타일 컴포넌트
export interface StylesProps {

}
const StyledCardListItem = styled.li<StylesProps>`
  display: flex;
  border-bottom: 1px solid #E5E7EB;
  padding: 1.5em;

  @media screen and (max-width: 65rem) {
    flex-direction: column;
    gap: 0.5em;
  }
`