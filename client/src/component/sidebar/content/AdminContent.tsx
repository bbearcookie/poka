import React from 'react';
import { ChildItem, ParentItem } from '@component/sidebar/ListItem';
import { faUser, faCommentAlt, faQuestionCircle, faArrowsSpin, faVcard, faTruckFast, faPeopleGroup, faInfoCircle, faCut } from '@fortawesome/free-solid-svg-icons';

function AdminContent() {
  return (
    <>
      <ul className="category">
        <li className="subheader-label">소유권 관리</li>
        <ParentItem id="voucher" icon={faVcard} text="소유권">
          <ChildItem to="/admin/voucher/list" text="목록" />
          <ChildItem to="/admin/voucher/writer" text="발급" />
        </ParentItem>
        <ChildItem to="/admin/shipping/list" icon={faTruckFast} text="배송" />
      </ul>
      <ul className="category">
        <li className="subheader-label">데이터 관리</li>
        <ParentItem id="group" icon={faPeopleGroup} text="그룹">
          <ChildItem to="/admin/group/list" text="목록" />
          <ChildItem to="/admin/group/writer" text="추가" />
        </ParentItem>
        <ParentItem id="photo" icon={faInfoCircle} text="포토카드">
          <ChildItem to="/admin/photo/list" text="목록" />
          <ChildItem to="/admin/photo/writer" text="추가" />
          <ChildItem to="/admin/photo/crop" icon={faCut} text="자르기" />
        </ParentItem>
      </ul>
    </>
  );
}

export default AdminContent;