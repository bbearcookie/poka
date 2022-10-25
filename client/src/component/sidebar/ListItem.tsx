import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector, useAppDispatch } from '@app/redux/reduxHooks';
import { changeActiveURI, changeParentActiveId } from './sidebarSlice';

// 토글 기능에 따라서 보여주는 스타일 컴포넌트  =============================================================
// 하위 아이템의 개수에 따라서 height를 다르게 주기 위해 styled-components를 사용했다.
interface ExpandContentProps {
  show: boolean;
  length: number;
}

const ExpandContent = styled.ul<ExpandContentProps>`
  max-height: ${p => p.show ? (2.9 * p.length).toString() + "em" : "0em"};
  visibility: ${p => p.show ? "visible" : "hidden"};
`;

// 부모 아이템 컴포넌트 ===========================================================================
// 토글 기능에 따라서 자식 아이템들을 보여주고 숨긴다.
interface ParentItemProps {
  id: string;
  icon?: IconDefinition;
  text: string;
  iconMarginRight?: string; // 아이콘 크기가 달라서 마진을 직접 줘야하는 경우에 부여
  children: React.ReactNode; // 리스트 아이템의 하위 메뉴가 있는 경우에 사용
}

const ParentItemDefaultProps = {};

export function ParentItem(
  { id, icon, text, iconMarginRight, children }
  : ParentItemProps & typeof ParentItemDefaultProps) {
  const [show, setShow] = useState(false);
  const parentActiveId = useAppSelector((state) => state.sidebar.parentActiveId);
  const length = React.Children.count(children); // 하위 아이템 개수

  const onClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    
    setShow(!show);
  }, [show]);

  return (
    <>
      <li className={classNames(
        "list-item",
        {"parentActive": parentActiveId === id}
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
        <FontAwesomeIcon icon={show ? faAngleDown : faAngleRight} />
      </li>
      
      <ExpandContent className="ExpandContent" show={show ? true : false} length={length}>
        {React.Children.map(children, (child: any) => {
          return React.cloneElement(child, {
            parentId: id,
            showParent: () => setShow(true)
          });
        })}
      </ExpandContent>
    </>
  );
}

ParentItem.defaultProps = ParentItemDefaultProps;

// 자식 아이템 컴포넌트 =========================================================================
interface ChildItemProps {
  showParent?: () => {}, // 부모 내용을 보여주는 함수
  parentId?: string;
  to?: string;
  icon?: IconDefinition;
  text: string;
  iconMarginRight?: string; // 아이콘 크기가 달라서 마진을 직접 줘야하는 경우에 부여
}

const ChildItemDefaultProps = {
  to: '#'
};

export function ChildItem(
  { showParent, parentId, to, icon, iconMarginRight, text }
  : ChildItemProps & typeof ChildItemDefaultProps) {
  const URI = window.location.pathname;
  const activeURI = useAppSelector((state) => state.sidebar.activeURI);
  const dispatch = useAppDispatch();

  // 첫 렌더시 URI 내용 가지고 부모의 액티브 설정
  useEffect(() => {
    if (to === URI) {
      dispatch(changeParentActiveId(parentId)); // 부모 액티브 설정
      showParent && showParent(); // 부모의 하위 아이템 보여주기
    }
  }, []);

  const onClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // 사이드바 닫기 이벤트 발생하지 않도록 막음

    // 클릭한 아이템을 액티브로 지정
    dispatch(changeActiveURI(to));

    // 부모 아이템이 있으면 부모 아이템을 액티브로 지정 (색상 변경)
    if (parentId) dispatch(changeParentActiveId(parentId));

    // 부모 아이템이 없으면 액티브 해제
    else dispatch(changeParentActiveId(0));
  }, []);

  return (
    <Link to={to ? to : "#"} onClick={onClick}>
      <li className={classNames(
        "list-item",
        {"active": activeURI === to},
      )}>
        {icon && 
          <FontAwesomeIcon 
            className="icon"
            icon={icon}
            style={iconMarginRight ? {marginRight: iconMarginRight} : {}}
          />
        }
        <span className="text">{text}</span>
      </li>
    </Link>
  );
}

ChildItem.defaultProps = ChildItemDefaultProps;