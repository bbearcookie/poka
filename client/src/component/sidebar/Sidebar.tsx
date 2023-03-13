import React, { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useAppSelector, useAppDispatch } from '@app/redux/reduxHooks';
import { changeActiveURI, changeShow } from './sidebarSlice';
import AdminContent from './content/AdminContent';
import UserContent from './content/UserContent';
import './Sidebar.scss';

interface Props {
  mode: 'USER' | 'ADMIN';
}
const DefaultProps = {};

function Sidebar({ mode }: Props) {
  const show = useAppSelector((state) => state.sidebar.show);
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
    <aside className={classNames("Sidebar_wrapper", {"hide": !show})} onClick={closeSidebar}>
      <div className="Sidebar" onClick={blockPropagation}>
        {mode === 'ADMIN' && <AdminContent />}
        {mode === 'USER' && <UserContent />}
      </div>
    </aside>
  );
}

export default Sidebar;