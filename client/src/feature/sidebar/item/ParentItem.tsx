import React, { Children, isValidElement, cloneElement, useState, useCallback } from 'react';
import { useAppSelector } from '@app/redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import ChildItem, { Props as ChildItemProps } from './ChildItem';
import { Item, ItemList, ParentWrapper } from './_styles';
import classNames from 'classnames';

interface Props {
  icon?: IconDefinition;
  text?: string;
  children?: React.ReactNode;
}

function ParentItem({ icon, text, children }: Props) {
  const { activeId } = useAppSelector(state => state.newSidebar);
  const [isOpened, setIsOpened] = useState(false);
  const [childs, setChilds] = useState<number[]>([]);

  const onClick = useCallback(() => {
    setIsOpened(!isOpened);
  }, [isOpened]);

  const addChild = useCallback((id: number) => {
    setChilds(prev => prev.concat(id));
  }, []);

  return (
    <ParentWrapper>
      <ul className="parent-list">
        <Item
          className={classNames({ 'parent-active': childs.includes(activeId) && activeId !== 0 })}
          onClick={onClick}
        >
          {icon && <FontAwesomeIcon icon={icon} width="1em" height="1em" />}
          <span className="text">{text}</span>
          <FontAwesomeIcon icon={isOpened ? faAngleDown : faAngleRight} />
        </Item>

        <ItemList isOpened={isOpened} length={Children.count(children)}>
          {Children.map(children, child =>
            isValidElement(child) && child.type === ChildItem
              ? cloneElement(child as React.ReactElement<ChildItemProps>, { addChild })
              : child
          )}
        </ItemList>
      </ul>
    </ParentWrapper>
  );
}

export default ParentItem;
