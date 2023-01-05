import React, { useCallback } from 'react';
import classNames from 'classnames';
import useGroupQuery from '@api/query/group/useGroupQuery';
import { State, Action } from '../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}
const DefaultProps = {};

function MemberSelect({ state, dispatch }: Props) {
  const { data: group, status } = useGroupQuery(state.select.groupId);

  const onSelectMember = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    const memberId = e.currentTarget.value;
    dispatch({ type: 'SET_MEMBER_ID', memberId });
  }, [dispatch]);

  return (
    <>
      {status === 'success' && 
      <ul className="member-select">
        <li
          className={classNames({"active": state.select.memberId === 0})}
          value={0}
          onClick={onSelectMember}
        >
          전체
        </li>

        {group.members.map(member => 
        <li
          className={classNames({"active": state.select.memberId === member.member_id})}
          key={member.member_id}
          value={member.member_id}
          onClick={onSelectMember}
        >
          {member.name}
        </li>)}
      </ul>}
    </>
  );
}

export default MemberSelect;