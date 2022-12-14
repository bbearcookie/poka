import React, { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@app/redux/reduxHooks';
import { setGroups, setMembers, toggleGroup, toggleMember } from '../photoListCardSlice';
import GroupFilter from '@component/list/common/filter/GroupFilter';
import MemberFilter from '@component/list/common/filter/MemberFilter';
import { GroupType, MemberType } from '@component/list/common/filter/DataType';

interface Props {
  resetOnMount: boolean;
}
const DefaultProps = {};

function FilterCheck({ resetOnMount }: Props) {
  const filter = useAppSelector((state) => state.photoListCard.filter);
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
    </section>
  );
}

export default FilterCheck;