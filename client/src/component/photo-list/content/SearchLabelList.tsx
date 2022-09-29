import React from 'react';
import { useAppSelector, useAppDispatch } from '@app/redux/reduxHooks';
import CardHeader from '@component/card/basic/CardHeader';
import SearchLabel from '@component/label/SearchLabel';
import { removeName, toggleGroup, toggleMember } from '../photoListCardSlice';

interface SearchLabelListProps {
  children?: React.ReactNode;
}
const SearchLabelListDefaultProps = {};

function SearchLabelList({ children }: SearchLabelListProps & typeof SearchLabelListDefaultProps) {
  const filter = useAppSelector((state) => state.photoListCard.filter);
  const dispatch = useAppDispatch();

  return (
    <CardHeader className="search-label-section">
      {/* 포토카드 이름 관련 필터 */}
      {filter.names.map((name) => (
      <SearchLabel
        key={name.id}
        category="포토카드 이름"
        text={name.value}
        handleRemove={() => dispatch(removeName(name.id))}
      />
      ))}

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