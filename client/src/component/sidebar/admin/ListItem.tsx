import React, { useEffect, useState, useCallback } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector, useAppDispatch } from '@app/reduxHooks';
import { changeActiveId, changeParentActiveId } from './sidebarSlice';

// 토글 기능에 따라서 보여주는 스타일 컴포넌트  =============================================================
// 하위 아이템의 개수에 따라서 height를 다르게 주기 위해 styled-components를 사용했다.
type ExpandContentProps = {
  show: boolean;
  length: number;
};

const ExpandContent = styled.ul<ExpandContentProps>`
  max-height: ${p => p.show ? (2.9 * p.length).toString() + "em" : "0em"};
  visibility: ${p => p.show ? "visible" : "hidden"};
`;

// 리스트 아이템 컴포넌트 =========================================================================
// 하위 아이템이 있는 경우 children으로 보내면 토글 기능에 따라서 보여주고 숨긴다.
type ListItemProps = {
  id: number;
  parentId?: number;
  icon?: IconDefinition;
  text: string;
  iconMarginRight?: string; // 아이콘 크기가 달라서 마진을 직접 줘야하는 경우에 부여
  children?: React.ReactNode; // 리스트 아이템의 하위 메뉴가 있는 경우에 사용
};

function ListItem({ id, parentId, icon, iconMarginRight, text, children }: ListItemProps) {
  const [show, setShow] = useState(false);
  const activeId = useAppSelector((state) => state.adminSidebar.activeId);
  const parentActiveId = useAppSelector((state) => state.adminSidebar.parentActiveId);
  const dispatch = useAppDispatch();
  const length = React.Children.count(children); // 하위 아이템 개수

  const onClick = useCallback(() => {
    // 자식으로 확장 아이템이 있는 경우 보여주기 ON/OFF 하고 종료
    if (children) return setShow(!show);

    // 클릭한 아이템을 액티브로 지정
    dispatch(changeActiveId(id));

    // 해당 아이템이 부모의 확장 아이템인 경우 부모 아이템을 액티브로 지정 (색상 변경)
    if (parentId) dispatch(changeParentActiveId(parentId));

    // 아무것도 아니면 부모 액티브 해제
    else dispatch(changeParentActiveId(0));
  }, [show]);

  return (
    <>
      <li
        className={classNames(
          "list-item",
          {"active": id === activeId},
          {"parentActive": id === parentActiveId}
        )}
        onClick={onClick}
      >
        {icon && 
          <FontAwesomeIcon 
          className="icon"
          icon={icon}
          style={iconMarginRight ? {marginRight: iconMarginRight} : {}}
        />}
        <span className="text">{text}</span>
        {children && <FontAwesomeIcon icon={show ? faAngleDown : faAngleRight} />}
      </li>
      
      {children &&
        <ExpandContent className="ExpandContent" show={show ? true : false} length={length}>
          {React.Children.map(children, (child: any) => {
            return React.cloneElement(child, { parentId: id });
          })}
        </ExpandContent>
      }
    </>
  )
}


export default ListItem;