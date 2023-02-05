import React, { useCallback } from 'react';
import GroupFilter from '@component/list/common/filter/GroupFilter';
import MemberFilter from '@component/list/common/filter/MemberFilter';
import { GroupFilterType, MemberFilterType } from '@type/listFilter';
import { State, Action } from '../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}
const DefaultProps = {};

function FilterCheck({ state, dispatch }: Props) {
  const handleSetGroups = useCallback((groups: GroupFilterType[]) => {
    dispatch({ type: "SET_GROUPS", payload: groups });
  }, [dispatch]);

  const handleToggleGroup = useCallback((groupId: number) => {
    dispatch({ type: "TOGGLE_GROUP", groupId });
  }, [dispatch]);

  const handleSetMembers = useCallback((members: MemberFilterType[]) => {
    dispatch({ type: "SET_MEMBERS", payload: members });
  }, [dispatch]);

  const handleToggleMember = useCallback((memberId: number) => {
    dispatch({ type: "TOGGLE_MEMBER", memberId });
  }, [dispatch]);

  return (
    <section className="check-section">
      <GroupFilter
        filter={state.groups}
        setGroups={handleSetGroups}
        toggleGroup={handleToggleGroup}
      />
      <MemberFilter
        groupFilter={state.groups}
        memberFilter={state.members}
        setMembers={handleSetMembers}
        toggleMember={handleToggleMember}
      />
    </section>
  );
}

export default FilterCheck;