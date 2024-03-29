import React, { Children } from 'react';
import { StyledItemList } from './ItemList.style';

export interface Props {
  isOpened: boolean;
  children?: React.ReactNode;
}

function ItemList({ isOpened, children, ...rest }: Props) {
  return (
    <StyledItemList {...rest} isOpened={isOpened} length={Children.count(children)}>
      {children}
    </StyledItemList>
  );
}

export default ItemList;
