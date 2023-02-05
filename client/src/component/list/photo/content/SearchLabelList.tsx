import React from 'react';
import CardHeader from '@component/card/basic/CardHeader';
import SearchLabel from '@component/label/SearchLabel';
import { State, Action } from '../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}
const DefaultProps = {};

function SearchLabelList({ state, dispatch }: Props) {
  return (
    <CardHeader className="search-label-section">
      {/* 포토카드 이름 관련 필터 */}
      {state.names.map((name) => (
      <SearchLabel
        key={name.id}
        category="포토카드 이름"
        text={name.value}
        handleRemove={() => dispatch({ type: "REMOVE_NAME", id: name.id })}
      />))}

      {/* 그룹 관련 필터 */}
      {state.groups.map((group) => group.checked && (
      <SearchLabel
        key={group.groupId}
        category="그룹"
        text={group.name}
        handleRemove={() => dispatch({ type: "TOGGLE_GROUP", groupId: group.groupId})}
      />))}

      {/* 멤버 관련 필터 */}
      {state.members.map((member) => member.checked && (
      <SearchLabel
        key={member.memberId}
        category="멤버"
        text={member.name}
        handleRemove={() => dispatch({ type: "TOGGLE_MEMBER", memberId: member.memberId})}
      />))}
    </CardHeader>
  );
}

export default SearchLabelList;