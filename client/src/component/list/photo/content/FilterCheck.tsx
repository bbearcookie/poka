import React, { useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@app/redux/reduxHooks';
import { setGroups, setMembers, toggleGroup, toggleMember } from '../photoListCardSlice';
import GroupFilter from '@component/list/common/filter/GroupFilter';
import MemberFilter from '@component/list/common/filter/MemberFilter';

interface Props {
}
const DefaultProps = {};

function FilterCheck({  }: Props) {
  const filter = useAppSelector((state) => state.photoListCard.filter);
  const dispatch = useAppDispatch();

  return (
    <section className="check-section">
      <GroupFilter
        filter={filter.groups}
        setGroups={(groups) => dispatch(setGroups(groups))}
        toggleGroup={(groupId) => dispatch(toggleGroup(groupId))}
      />

      <MemberFilter
        groupFilter={filter.groups}
        memberFilter={filter.members}
        setMembers={(members) => dispatch(setMembers(members))}
        toggleMember={(memberId) => dispatch(toggleMember(memberId))}
      />
    </section>
  );
}

export default FilterCheck;