import React from 'react';
import { useAppSelector, useAppDispatch } from '@app/reduxHooks';
import CardHeader from '@component/card/basic/CardHeader';
import SearchLabel from '@component/label/SearchLabel';
import { VoucherStateName, toggleGroup, toggleMember, changeVoucherFilter } from '../voucherListSlice';

interface SearchLabelListProps {
  children?: React.ReactNode;
}
const SearchLabelListDefaultProps = {};

function SearchLabelList({ children }: SearchLabelListProps & typeof SearchLabelListDefaultProps) {
  const filter = useAppSelector((state) => state.voucherList.filter);
  const dispatch = useAppDispatch();

  return (
    <CardHeader className="search-label-section">
      {/* 상태 관련 필터 */}
      {filter.state !== 'ALL' &&
      <SearchLabel
        category="상태"
        text={VoucherStateName[filter.state]}
        handleRemove={() => dispatch(changeVoucherFilter('ALL'))}
      />}

      {/* 그룹 관련 필터 */}
      {filter.groups.map((group) => group.checked && (
      <SearchLabel
        key={group.groupId}
        category="그룹"
        text={group.name}
        handleRemove={() => dispatch(toggleGroup(group.groupId))}
      />
      ))}

      {/* 멤버 관련 필터 */}
      {filter.members.map((member) => member.checked && (
      <SearchLabel
        key={member.memberId}
        category="멤버"
        text={member.name}
        handleRemove={() => dispatch(toggleMember(member.memberId))}
      />
      ))}
    </CardHeader>
  );
}

SearchLabelList.defaultProps = SearchLabelListDefaultProps;
export default SearchLabelList;