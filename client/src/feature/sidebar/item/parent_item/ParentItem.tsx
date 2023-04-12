import React from 'react';
import classNames from 'classnames';
import { useAppSelector } from '@app/redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import useIsOpened from '../../hook/useIsOpened';
import useItemList from '../item_list/hook/useItemList';
import ItemList from '../item_list/ItemList';
import { StyledItem } from '../item/Item.style';
import { StyledParentItem } from './ParentItem.style';

interface Props {
  icon?: IconDefinition;
  text?: string;
  children?: React.ReactNode;
}

function ParentItem({ icon, text, children }: Props) {
  const { activeId } = useAppSelector(state => state.sidebar);
  const { isOpened, toggleOpen } = useIsOpened();
  const itemList = useItemList();

  return (
    <StyledParentItem>
      <ul css={{ padding: 0 }}>
        <StyledItem
          className={classNames({
            'active': itemList.childIds.includes(activeId) && activeId !== 0,
          })}
          onClick={toggleOpen}
        >
          {icon && <FontAwesomeIcon icon={icon} width="1em" height="1em" />}
          <span className="text">{text}</span>
          <FontAwesomeIcon icon={isOpened ? faAngleDown : faAngleRight} />
        </StyledItem>

        <ItemList {...itemList} isOpened={isOpened}>
          {children}
        </ItemList>
      </ul>
    </StyledParentItem>
  );
}

export default ParentItem;
