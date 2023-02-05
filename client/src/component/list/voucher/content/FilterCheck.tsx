import React, { useCallback } from 'react';
import { DefaultFilterType } from '../VoucherListCard';
import GroupFilter from '@component/list/common/filter/GroupFilter';
import MemberFilter from '@component/list/common/filter/MemberFilter';
import StateFilter from '@component/list/common/filter/StateFilter';
import { FilterItemType } from '@type/listFilter';
import { State, Action } from '../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  defaultFilter: DefaultFilterType;
}
const DefaultProps = {};

function FilterCheck({ state, dispatch, defaultFilter }: Props) {

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

      {defaultFilter.state === 'all' &&
      <StateFilter
        filter={state.state}
        changeFilter={(value) => dispatch({ type: "SET_VOUCHER_STATE", value })}
      />}
    </section>
  );
}

export default FilterCheck;