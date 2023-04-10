import {
  faHome,
  faTimeline,
  faBagShopping,
  faTruckFast,
  faIdCard,
  faPersonCircleQuestion,
  faUser,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { Category, CategoryTitle } from '../_styles';
import ParentItem from '../item/ParentItem';
import ChildItem from '../item/ChildItem';

function AdminContent() {
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
        <ChildItem to="/question" icon={faPersonCircleQuestion} text="문의사항" />
      </Category>
    </>
  );
}

export default AdminContent;
