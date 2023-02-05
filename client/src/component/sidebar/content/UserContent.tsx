import React from 'react';
import { ChildItem, ParentItem } from '@component/sidebar/ListItem';
import { faHome, faShareNodes, faTimeline, faBagShopping, faTruckFast, faIdCard, faPersonCircleQuestion, faArrowsSpin } from '@fortawesome/free-solid-svg-icons';

interface Props {
  children?: React.ReactNode;
}
const DefaultProps = {};

function UserContent({  }: Props) {
  return (
    <>
      <ul className="category">
        <li className="subheader-label">메인</li>
        <ChildItem to="/" icon={faHome} text="메인" />
      </ul>
      <ul className="category">
        <li className="subheader-label">포토카드 교환</li>
        <ChildItem to="/trade/list" icon={faArrowsSpin} text="교환글" />
        <ChildItem to="/trade/history" icon={faTimeline} text="내역" />
      </ul>
      <ul className="category">
        <li className="subheader-label">포토카드 보관함</li>
        <ChildItem to="/voucher/list" icon={faBagShopping} text="소유권" />
        <ChildItem to="/shipping/list" icon={faTruckFast} text="배송" />
        <ChildItem to="/shipping/writer" icon={faTruckFast} text="배송요청 (임시)" />
      </ul>
      <ul className="category">
        <li className="subheader-label">마이페이지</li>
        <ChildItem to="/profile" icon={faIdCard} text="프로필" />
        <ChildItem to="/question" icon={faPersonCircleQuestion} text="문의사항" />
      </ul>
    </>
  );
}

export default UserContent;