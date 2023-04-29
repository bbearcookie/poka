import { useRef } from 'react';
import nextIdContext from './nextIdContext';
import {
  faTimeline,
  faBagShopping,
  faTruckFast,
  faIdCard,
  faUser,
  faMagnifyingGlass,
  faVcard,
  faPeopleGroup,
  faInfoCircle,
  faCut,
} from '@fortawesome/free-solid-svg-icons';
import { Category, CategoryTitle } from './_styles';
import ParentItem from '../item/parent_item/ParentItem';
import ChildItem from '../item/item/hoc/withActive';
import { BarType } from '../Sidebar';

interface Props {
  barType: BarType;
}

function BarContent({ barType }: Props) {
  const nextId = useRef(1);

  const renderContent = () => {
    switch (barType) {
      case 'ADMIN':
        return <AdminContent />;
      case 'USER':
        return <UserContent />;
      default:
        return null;
    }
  };

  return (
    <nextIdContext.Provider value={nextId}>
      {renderContent()}
    </nextIdContext.Provider>
  );
}

export default BarContent;

function AdminContent() {
  return (
    <>
      <Category>
        <CategoryTitle>소유권 관리</CategoryTitle>
        <ParentItem icon={faVcard} text="소유권">
          <ChildItem to="/admin/voucher/list" text="목록" />
          <ChildItem to="/admin/voucher/writer" text="발급" />
        </ParentItem>
        <ChildItem to="/admin/shipping/list" icon={faTruckFast} text="배송" />
      </Category>
      <Category>
        <CategoryTitle>데이터 관리</CategoryTitle>
        <ParentItem icon={faPeopleGroup} text="그룹">
          <ChildItem to="/admin/group/list" text="목록" />
          <ChildItem to="/admin/group/writer" text="추가" />
        </ParentItem>
        <ParentItem icon={faInfoCircle} text="포토카드">
          <ChildItem to="/admin/photo/list" text="목록" />
          <ChildItem to="/admin/photo/writer" text="추가" />
          <ChildItem to="/admin/photo/crop" icon={faCut} text="자르기" />
        </ParentItem>
      </Category>
    </>
  );
}

function UserContent() {
  return (
    <>
      <Category>
        <CategoryTitle>포토카드 교환</CategoryTitle>
        <ChildItem to="/trade/mine" icon={faUser} text="내 교환" />
        <ChildItem to="/trade/search" icon={faMagnifyingGlass} text="찾기" />
        <ChildItem to="/trade/history" icon={faTimeline} text="기록" />
      </Category>
      <Category>
        <CategoryTitle>포토카드 보관함</CategoryTitle>
        <ChildItem to="/voucher/list" icon={faBagShopping} text="소유권" />
        <ChildItem to="/shipping/list" icon={faTruckFast} text="배송" />
      </Category>
      <Category>
        <CategoryTitle>마이페이지</CategoryTitle>
        <ChildItem to="/myinfo" icon={faIdCard} text="내 정보" />
      </Category>
    </>
  );
}
