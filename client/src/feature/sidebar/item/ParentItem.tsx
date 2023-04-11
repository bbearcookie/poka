import React, { Children, isValidElement, cloneElement, useState, useCallback } from 'react';
import { useAppSelector } from '@app/redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import ChildItemWithActive, { Props as ChildItemProps } from './child/withActive';
import { useIsOpened } from '../hook/useIsOpened';
import { StyledItem, StyledItemList, ParentWrapper } from './_styles';
import classNames from 'classnames';

interface Props {
  icon?: IconDefinition;
  text?: string;
  children?: React.ReactNode;
}

function ParentItem({ icon, text, children }: Props) {
  const { activeId } = useAppSelector(state => state.newSidebar);
  const { isOpened, toggleOpen } = useIsOpened();
  const [childs, setChilds] = useState<number[]>([]);

  const addChild = useCallback((id: number) => {
    setChilds(prev => prev.concat(id));
  }, []);

  return (
    <ParentWrapper>
      <ul className="parent-list">
        <StyledItem
          className={classNames({ 'parent-active': childs.includes(activeId) && activeId !== 0 })}
          onClick={toggleOpen}
        >
          {icon && <FontAwesomeIcon icon={icon} width="1em" height="1em" />}
          <span className="text">{text}</span>
          <FontAwesomeIcon icon={isOpened ? faAngleDown : faAngleRight} />
        </StyledItem>

        <StyledItemList isOpened={isOpened} length={Children.count(children)}>
          {Children.map(children, child =>
            isValidElement(child) && child.type === ChildItemWithActive
              ? cloneElement(child as React.ReactElement<ChildItemProps>, { addChild })
              : child
          )}
        </StyledItemList>
      </ul>
    </ParentWrapper>
  );
}

export default ParentItem;
