import React, { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { ChildItem, ParentItem } from '@component/sidebar/admin/ListItem';
import { useAppSelector, useAppDispatch } from '@app/reduxHooks';
import { changeActiveURI, changeShow } from './sidebarSlice';
import { faUser, faCommentAlt, faQuestionCircle, faArrowsSpin, faVcard, faTruck, faPeopleGroup, faInfoCircle, faCut } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.scss';

interface SidebarProps {
  children?: React.ReactNode;
}

const SidebarDefaultProps = {};

function Sidebar({ children }: SidebarProps & typeof SidebarDefaultProps) {
  const show = useAppSelector((state) => state.adminSidebar.show);
  const dispatch = useAppDispatch();
  const location = useLocation();

  // URI 정보 변경시 사이드바 액티브 설정
  useEffect(() => {
    dispatch(changeActiveURI(location.pathname));
  }, [dispatch, location.pathname]);

  // 사이드바 닫기
  const closeSidebar = useCallback((e: React.MouseEvent) => {
    dispatch(changeShow(false));
  }, [dispatch]);

  // 사이드바 클릭시 닫히는 현상 방지
  const blockPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <div className={classNames("Sidebar_wrapper", {"hide": !show})} onClick={closeSidebar}>
      <aside className="Sidebar" onClick={blockPropagation}>
        <ul className="category">
          <li className="subheader-label">사용자 관리</li>
          <ChildItem to="/admin/user" icon={faUser} text="사용자" />
        </ul>
        <ul className="category">
          <li className="subheader-label">커뮤니티 관리</li>
          <ChildItem to="/admin/notice" icon={faCommentAlt} text="공지사항" />
          <ChildItem to="/admin/question" icon={faQuestionCircle} text="문의사항"/>
        </ul>
        <ul className="category">
          <li className="subheader-label">교환 관리</li>
          <ChildItem to="/admin/trade" icon={faArrowsSpin} text="교환글" iconMarginRight="0.8em" />
          <ParentItem id="voucher" icon={faVcard} text="소유권">
            <ChildItem to="/admin/voucher/list" text="목록" />
            <ChildItem to="/admin/voucher/writer" text="발급" />
          </ParentItem>
          <ChildItem to="/admin/shipping" icon={faTruck} text="배송" />
        </ul>
        <ul className="category">
          <li className="subheader-label">데이터 관리</li>
          <ParentItem id="group" icon={faPeopleGroup} text="그룹">
            <ChildItem to="/admin/group/list" text="목록" />
            <ChildItem to="/admin/group/writer" text="추가" />
          </ParentItem>
          <ParentItem id="photo" icon={faInfoCircle} text="포토카드" iconMarginRight="0.9em">
            <ChildItem to="/admin/photo/list" text="목록" />
            <ChildItem to="/admin/photo/writer" text="추가" />
            <ChildItem to="/admin/photo/crop" icon={faCut} text="자르기" />
          </ParentItem>
        </ul>
        <ul className="category">
          <ChildItem to="/admin/first" text="테스트페이지" />
        </ul>
      </aside>
    </div>
  );
}

Sidebar.defaultProps = SidebarDefaultProps;

export default Sidebar;