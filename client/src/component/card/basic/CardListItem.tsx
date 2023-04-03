import React from 'react';
import { CardListItem as StyledCardListItem, ItemTitle } from './_styles';

interface Props {
  title?: string | React.ReactNode;
  children?: React.ReactNode;
}

function CardListItem({ title, children }: Props) {
  return (
    <StyledCardListItem>
      <ItemTitle>{title}</ItemTitle>
      <div>{children}</div>
    </StyledCardListItem>
  );
}

export default CardListItem;
