import { Children, isValidElement, cloneElement } from 'react';
import ItemList, { Props as ItemListProps } from '../ItemList';
import { ItemListHook } from '../hook/useItemList';
import ChildItemWithActive, { Props as ChildItemProps } from '../../item/hoc/withActive';

interface Props extends ItemListProps, ItemListHook {}

const withDetectChild = (ItemListComponent: typeof ItemList) => {
  return (props: Props) => {
    return (
      <ItemListComponent {...props}>
        {Children.map(props.children, child =>
          isValidElement(child) && child.type === ChildItemWithActive
            ? cloneElement(child as React.ReactElement<ChildItemProps>, {
                registerToParent: props.registerToParent,
              })
            : child
        )}
      </ItemListComponent>
    );
  };
};

export default withDetectChild(ItemList);
