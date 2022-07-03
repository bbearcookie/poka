import React, { useEffect } from 'react';
import { ChildItem, ParentItem } from '@component/sidebar/admin/ListItem';
import { faUser, faCommentAlt, faQuestionCircle, faArrowsSpin, faVcard, faTruck, faPeopleGroup, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '@app/reduxHooks';
import { changeActiveURI } from './sidebarSlice';
import './Sidebar.scss';

type SidebarProps = {
  children?: React.ReactNode;
};

function Sidebar({ children }: SidebarProps) {
  const URI = window.location.pathname;
  const dispatch = useAppDispatch();

  // 새로고침시 URI 정보 가지고 사이드바 액티브 설정
  useEffect(() => {
    dispatch(changeActiveURI(URI));
  }, []);

  return (
    <aside className="Sidebar">
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
        <ChildItem to="shipping" icon={faTruck} text="배송" />
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
        </ParentItem>
      </ul>
      {/* <br/><br/><br/><br/><br/> */}
      {/*{Array.from({length: 100}).map((_, idx) => {
        return (<div key={idx}>사이드바~</div>);
      })} */}
    </aside>
  );
}

Sidebar.defaultProps = {

};

export default Sidebar;