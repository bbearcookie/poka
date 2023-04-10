import {
  faVcard,
  faTruckFast,
  faPeopleGroup,
  faInfoCircle,
  faCut,
} from '@fortawesome/free-solid-svg-icons';
import { Category, CategoryTitle } from '../_styles';
import ParentItem from '../item/ParentItem';
import ChildItem from '../item/ChildItem';

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

export default AdminContent;
