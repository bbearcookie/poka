import React from 'react';
import { ChildItem, ParentItem } from '@component/sidebar/ListItem';
import {
  faHome,
  faShareNodes,
  faTimeline,
  faBagShopping,
  faTruckFast,
  faIdCard,
  faPersonCircleQuestion,
  faArrowsSpin,
  faUser,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

function UserContent() {
  return (
    <>
      <ul className="category">
        <li className="subheader-label">메인</li>
        <ChildItem to="/" icon={faHome} text="메인" />
      </ul>
      <ul className="category">
        <li className="subheader-label">포토카드 교환</li>
        <ChildItem to="/trade/mine" icon={faUser} text="내 교환" />
        <ChildItem to="/trade/search" icon={faMagnifyingGlass} text="찾기" />
        <ChildItem to="/trade/history" icon={faTimeline} text="기록" />
      </ul>
      <ul className="category">
        <li className="subheader-label">포토카드 보관함</li>
        <ChildItem to="/voucher/list" icon={faBagShopping} text="소유권" />
        <ChildItem to="/shipping/list" icon={faTruckFast} text="배송" />
      </ul>
      <ul className="category">
        <li className="subheader-label">마이페이지</li>
        <ChildItem to="/myinfo" icon={faIdCard} text="내 정보" />
        <ChildItem to="/question" icon={faPersonCircleQuestion} text="문의사항" />
      </ul>
    </>
  );
}

export default UserContent;
