import React, { Children, isValidElement, cloneElement } from 'react';
import { ItemListHook } from './hook/useItemList';
import ChildItemWithActive, { Props as ChildItemProps } from '../item/hoc/withActive';
import { StyledItemList } from './ItemList.style';

interface Props extends ItemListHook {
  isOpened: boolean;
  children?: React.ReactNode;
}

function ItemList({ addChild, isOpened, children }: Props) {
  return (
    <StyledItemList isOpened={isOpened} length={Children.count(children)}>
      {Children.map(children, child =>
        isValidElement(child) && child.type === ChildItemWithActive
          ? cloneElement(child as React.ReactElement<ChildItemProps>, { addChild })
          : child
      )}
    </StyledItemList>
  );
}

export default ItemList;
