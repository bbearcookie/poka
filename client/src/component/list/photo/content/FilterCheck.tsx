import React, { useCallback } from 'react';
import GroupFilter from '@component/list/common/filter/GroupFilter';
import MemberFilter from '@component/list/common/filter/MemberFilter';
import { FilterItemType } from '@type/listFilter';
import { State, Action } from '../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}
const DefaultProps = {};

function FilterCheck({ state, dispatch }: Props) {
  const handleSetGroups = useCallback((groups: FilterItemType[]) => {
    dispatch({ type: "SET", target: "groups", payload: groups });
  }, [dispatch]);

  const handleToggleGroup = useCallback((groupId: number) => {
    dispatch({ type: "TOGGLE", target: "groups", id: groupId });
  }, [dispatch]);

  const handleSetMembers = useCallback((members: FilterItemType[]) => {
    dispatch({ type: "SET", target: "members", payload: members });
  }, [dispatch]);

  const handleToggleMember = useCallback((memberId: number) => {
    dispatch({ type: "TOGGLE", target: "members", id: memberId });
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