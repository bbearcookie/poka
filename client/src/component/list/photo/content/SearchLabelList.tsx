import React from 'react';
import SearchLabel from '@component/list/common/SearchLabel';
import { SearchLabelSection } from '@component/list/common/Styles';
import { State, Action } from '../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}
const DefaultProps = {};

function SearchLabelList({ state, dispatch }: Props) {
  return (
    <SearchLabelSection>
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
        key={group.id}
        category="그룹"
        text={group.name}
        handleRemove={() => dispatch({ type: "TOGGLE", target: "groups",  id: group.id})}
      />))}

      {/* 멤버 관련 필터 */}
      {state.members.map((member) => member.checked && (
      <SearchLabel
        key={member.id}
        category="멤버"
        text={member.name}
        handleRemove={() => dispatch({ type: "TOGGLE", target: "members", id: member.id})}
      />))}
    </SearchLabelSection>
  );
}

export default SearchLabelList;