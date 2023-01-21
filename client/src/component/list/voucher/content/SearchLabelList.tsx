import React from 'react';
import { useAppSelector, useAppDispatch } from '@app/redux/reduxHooks';
import CardHeader from '@component/card/basic/CardHeader';
import SearchLabel from '@component/label/SearchLabel';
import { toggleGroup, toggleMember, setVoucherState, removeKeyword } from '../voucherListSlice';
import { VoucherStateValue } from '@/type/voucher';
import { DefaultFilterType } from '../VoucherListCard';

interface Props {
  defaultFilter: DefaultFilterType;
}
const DefaultProps = {};

function SearchLabelList({ defaultFilter }: Props) {
  const filter = useAppSelector((state) => state.voucherList.filter);
  const dispatch = useAppDispatch();

  return (
    <CardHeader className="search-label-section">
      {/* 상태 관련 필터 */}
      {defaultFilter.state === 'all' && filter.state !== 'all' &&
      <SearchLabel
        category="상태"
        text={VoucherStateValue[filter.state]}
        handleRemove={() => dispatch(setVoucherState('all'))}
      />}

      {/* 사용자 아이디 관련 필터 */}
      {defaultFilter.owner === 'all' && filter.usernames.map((username) => (
      <SearchLabel
        key={username.id}
        category="아이디"
        text={username.value}
        handleRemove={() => dispatch(removeKeyword({ type: 'USER_NAME', id: username.id }))}
      />))}

      {/* 포토카드 이름 관련 필터 */}
      {filter.names.map((name) => (
      <SearchLabel
        key={name.id}
        category="포토카드"
        text={name.value}
        handleRemove={() => dispatch(removeKeyword({type: 'PHOTO_NAME', id: name.id }))}
      />))}

      {/* 그룹 관련 필터 */}
      {filter.groups.map((group) => group.checked && (
      <SearchLabel
        key={group.groupId}
        category="그룹"
        text={group.name}
        handleRemove={() => dispatch(toggleGroup(group.groupId))}
      />))}

      {/* 멤버 관련 필터 */}
      {filter.members.map((member) => member.checked && (
      <SearchLabel
        key={member.memberId}
        category="멤버"
        text={member.name}
        handleRemove={() => dispatch(toggleMember(member.memberId))}
      />))}
    </CardHeader>
  );
}

export default SearchLabelList;