import React from 'react';
import { useAppSelector, useAppDispatch } from '@app/redux/reduxHooks';
import { setGroups, setMembers, toggleGroup, toggleMember, setVoucherState } from '../voucherListSlice';
import { DefaultFilterType } from '../VoucherListCard';
import GroupFilter from '@component/list/common/filter/GroupFilter';
import MemberFilter from '@component/list/common/filter/MemberFilter';
import StateFilter from '@component/list/common/filter/StateFilter';

interface Props {
}
const DefaultProps = {};

function FilterCheck({  }: Props) {
  const filter = useAppSelector((state) => state.voucherList.filter);
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

      <StateFilter
        filter={filter.state}
        changeFilter={(value) => dispatch(setVoucherState(value))}
      />
    </section>
  );
}

export default FilterCheck;