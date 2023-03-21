import React, { useEffect, useCallback } from 'react';
import useMembersQuery from '@api/query/member/useMembersQuery';
import DropdownItem from '@component/dropdown/DropdownItem';
import Filter from './content/_Filter';
import { State, Action } from './reducer';

interface Props {
  show: boolean;
  state: State;
  dispatch: React.Dispatch<Action>;
}

function MemberFilter({ show, state, dispatch }: Props) {
  const { data: members } = useMembersQuery();

  useEffect(() => {
    if (!members) return;

    // 그룹 선택 필터에서 선택한 그룹 ID
    let selectedGroups = state.groups.filter(g => g.checked).map(g => g.id);

    dispatch({
      type: "INIT_MEMBERS",
      members: members.members
        .filter(m => selectedGroups.includes(m.groupId))
        .map(m => ({
          id: m.memberId,
          name: m.name,
          checked: state.members.find(item => item.id === m.memberId)?.checked ? true : false
        }))
    });
  }, [state.groups]);

  // 아이템 클릭시 필터에 추가 or 제거
  const handleClickItem = useCallback((id: number) => {
    dispatch({ type: "TOGGLE_MEMBER", id });
  }, [dispatch]);

  if (show)
    return (
      <Filter title="멤버">
        {state.members.length === 0 &&
        <DropdownItem className="item">
          <input type="checkbox" checked={true} readOnly />
          <span>전체</span>
        </DropdownItem>}

        {state.members.map(m =>
        <DropdownItem
          key={m.id}
          className="item"
          onClick={() => handleClickItem(m.id)}
        >
          <input type="checkbox" checked={m.checked} readOnly />
          <span>{m.name}</span>
        </DropdownItem>)}
      </Filter>
    );
  else return <></>;
}

export default MemberFilter;