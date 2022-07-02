import React from 'react';
import ListItem from '@component/sidebar/admin/ListItem';
import { faUser, faCommentAlt, faQuestionCircle, faArrowsSpin, faVcard, faTruck, faPeopleGroup, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.scss';

type SidebarProps = {
  children?: React.ReactNode;
};

function Sidebar({ children }: SidebarProps) {
  let nextId = 1;

  return (
    <aside className="Sidebar">
      <ul className="category">
        <li className="subheader-label">사용자 관리</li>
        <ListItem id={nextId++} icon={faUser} text="사용자" />
      </ul>
      <ul className="category">
        <li className="subheader-label">커뮤니티 관리</li>
        <ListItem id={nextId++} icon={faCommentAlt} text="공지사항" />
        <ListItem id={nextId++} icon={faQuestionCircle} text="문의사항" />
      </ul>
      <ul className="category">
        <li className="subheader-label">교환 관리</li>
        <ListItem id={nextId++} icon={faArrowsSpin} text="교환글" iconMarginRight="0.8em" />
        <ListItem id={nextId++} icon={faVcard} text="소유권">
          <ListItem id={nextId++} text="목록" />
          <ListItem id={nextId++} text="발급" />
        </ListItem>
        <ListItem id={nextId++} icon={faTruck} text="배송" />
      </ul>
      <ul className="category">
        <li className="subheader-label">데이터 관리</li>
        <ListItem id={nextId++} icon={faPeopleGroup} text="그룹">
          <ListItem id={nextId++} text="목록" />
          <ListItem id={nextId++} text="추가" />
        </ListItem>
        <ListItem id={nextId++} icon={faInfoCircle} text="포토카드" iconMarginRight="0.9em">
          <ListItem id={nextId++} text="목록" />
          <ListItem id={nextId++} text="추가" />
        </ListItem>
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