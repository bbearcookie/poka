import React, { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@app/redux/reduxHooks';
import { setGroups, setMembers, toggleGroup, toggleMember, setVoucherState } from '../voucherListSlice';
import { DefaultFilterType } from '../VoucherListCard';
import GroupFilter from '@component/list/common/filter/GroupFilter';
import MemberFilter from '@component/list/common/filter/MemberFilter';
import StateFilter from '@component/list/common/filter/StateFilter';
import { GroupType, MemberType } from '@component/list/common/filter/DataType';

interface Props {
  resetOnMount: boolean;
  defaultFilter: DefaultFilterType;
}
const DefaultProps = {};

function FilterCheck({ resetOnMount, defaultFilter }: Props) {
  const filter = useAppSelector((state) => state.voucherList.filter);
  const dispatch = useAppDispatch();

  const handleSetGroups = useCallback((groups: GroupType[]) => {
    dispatch(setGroups(groups));
  }, [dispatch]);

  const handleToggleGroup = useCallback((groupId: number) => {
    dispatch(toggleGroup(groupId));
  }, [dispatch]);

  const handleSetMembers = useCallback((members: MemberType[]) => {
    dispatch(setMembers(members));
  }, [dispatch]);

  const handleToggleMember = useCallback((memberId: number) => {
    dispatch(toggleMember(memberId));
  }, [dispatch]);

  return (
    <section className="check-section">
      <GroupFilter
        resetOnMount={resetOnMount}
        filter={filter.groups}
        setGroups={handleSetGroups}
        toggleGroup={handleToggleGroup}
      />

      <MemberFilter
        resetOnMount={resetOnMount}
        groupFilter={filter.groups}
        memberFilter={filter.members}
        setMembers={handleSetMembers}
        toggleMember={handleToggleMember}
      />

      {defaultFilter.state === 'ALL' &&
      <StateFilter
        filter={filter.state}
        changeFilter={(value) => dispatch(setVoucherState(value))}
      />}
    </section>
  );
}

export default FilterCheck;