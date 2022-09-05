import React from 'react';
import { ChildItem, ParentItem } from '@component/sidebar/ListItem';
import { faHome, faShareNodes, faTimeline, faBagShopping, faTruckFast, faIdCard, faPersonCircleQuestion } from '@fortawesome/free-solid-svg-icons';

interface UserContentProps {
  children?: React.ReactNode;
}
const UserContentDefaultProps = {};

function UserContent({ children }: UserContentProps & typeof UserContentDefaultProps) {
  return (
    <>
      <ul className="category">
        <li className="subheader-label">메인</li>
        <ChildItem to="/" icon={faHome} text="메인" />
      </ul>
      <ul className="category">
        <li className="subheader-label">포토카드 교환</li>
        <ParentItem id="trade" icon={faShareNodes} text="교환" iconMarginRight="0.95em">
          <ChildItem to="/trade/writer" text="등록" />
          <ChildItem to="/trade/search" text="찾기" />
          <ChildItem to="/trade/matching" text="매칭" />
        </ParentItem>
        <ChildItem to="/trade/history" icon={faTimeline} text="내역" iconMarginRight="0.6em"/>
      </ul>
      <ul className="category">
        <li className="subheader-label">포토카드 보관함</li>
        <ChildItem to="/inventory" icon={faBagShopping} text="소유권" iconMarginRight="0.95em"/>
        <ChildItem to="/shipping" icon={faTruckFast} text="배송" />
      </ul>
      <ul className="category">
        <li className="subheader-label">마이페이지</li>
        <ChildItem to="/profile" icon={faIdCard} text="프로필" />
        <ChildItem to="/question" icon={faPersonCircleQuestion} text="문의사항" />
      </ul>
    </>
  );
}

UserContent.defaultProps = UserContentDefaultProps;
export default UserContent;