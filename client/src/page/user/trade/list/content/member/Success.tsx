import React, { useCallback } from 'react';
import classNames from 'classnames';
import { ResType } from '@api/query/group/useGroupQuery';
import { State, Action } from '../../reducer';

interface Props {
  group: ResType;
  state: State;
  dispatch: React.Dispatch<Action>;
}
const DefaultProps = {};

function Success({ group, state, dispatch }: Props) {
  const onSelectMember = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    const memberId = e.currentTarget.value;
    dispatch({ type: 'SET_MEMBER_ID', memberId });
  }, [dispatch]);

  return (
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
        className={classNames({"active": state.select.memberId === member.memberId})}
        key={member.memberId}
        value={member.memberId}
        onClick={onSelectMember}
      >
        {member.name}
      </li>)}
    </ul>
  );
}

export default Success;