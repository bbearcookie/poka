import React from 'react';
import SearchLabel from '@component/list/common/SearchLabel';
import { SearchLabelSection } from '@component/list/common/Styles';
import { VoucherStateValue } from '@component/label/StateLabel';
import { DefaultFilterType } from '../VoucherListCard';
import { State, Action } from '../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  defaultFilter: DefaultFilterType;
}

function SearchLabelList({ state, dispatch, defaultFilter }: Props) {
  return (
    <SearchLabelSection>
      {/* 상태 관련 필터 */}
      {defaultFilter.state === 'all' && state.state !== 'all' &&
      <SearchLabel
        category="상태"
        text={VoucherStateValue[state.state]}
        handleRemove={() => dispatch({ type: "SET_VOUCHER_STATE", value: "all" })}
      />}

      {/* 사용자 아이디 관련 필터 */}
      {defaultFilter.owner === 'all' && state.usernames.map((username) => (
      <SearchLabel
        key={username.id}
        category="아이디"
        text={username.value}
        handleRemove={() => dispatch({ type: "REMOVE_KEYWORD", target: "usernames", id: username.id })}
      />))}

      {/* 포토카드 이름 관련 필터 */}
      {state.names.map((name) => (
      <SearchLabel
        key={name.id}
        category="포토카드"
        text={name.value}
        handleRemove={() => dispatch({ type: "REMOVE_KEYWORD", target: "names", id: name.id })}
      />))}

      {/* 그룹 관련 필터 */}
      {state.groups.map((group) => group.checked && (
      <SearchLabel
        key={group.id}
        category="그룹"
        text={group.name}
        handleRemove={() => dispatch({ type: "TOGGLE", target: "groups", id: group.id })}
      />))}

      {/* 멤버 관련 필터 */}
      {state.members.map((member) => member.checked && (
      <SearchLabel
        key={member.id}
        category="멤버"
        text={member.name}
        handleRemove={() => dispatch({ type: "TOGGLE", target: "members", id: member.id })}
      />))}
    </SearchLabelSection>
  );
}

export default SearchLabelList;