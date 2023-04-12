import React from 'react';
import classNames from 'classnames';
import { useAppSelector } from '@app/redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import useIsOpened from '../../opened/hook/useIsOpened';
import useItemList from '../item_list/hook/useItemList';
import ItemListWithDetect from '../item_list/hoc/withDetectChild';
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
            active: itemList.childIds.includes(activeId) && activeId !== 0,
          })}
          onClick={toggleOpen}
        >
          {icon && <FontAwesomeIcon icon={icon} width="1em" height="1em" />}
          <span className="text">{text}</span>
          <FontAwesomeIcon icon={isOpened ? faAngleDown : faAngleRight} />
        </StyledItem>

        <ItemListWithDetect {...itemList} isOpened={isOpened}>
          {children}
        </ItemListWithDetect>
      </ul>
    </StyledParentItem>
  );
}

export default ParentItem;
