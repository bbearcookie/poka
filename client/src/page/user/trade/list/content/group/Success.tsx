import React, { useCallback } from 'react';
import classNames from 'classnames';
import { ResType } from '@api/query/group/useGroupsQuery';
import { groupImage } from '@api/resource';
import { State, Action } from '../../reducer';

interface Props {
  groups: ResType;
  state: State;
  dispatch: React.Dispatch<Action>;
}
const DefaultProps = {};

function Success({ groups, state, dispatch }: Props) {

  const onSelectGroup = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    const groupId = e.currentTarget.value;
    dispatch({ type: 'SET_GROUP_ID', groupId });
    dispatch({ type: 'SET_MEMBER_ID', memberId: 0});
  }, [dispatch]);

  return (
    <ul className="group-select">
      <li
        className={classNames({"active": state.select.groupId === 0})}
        value={0}
        onClick={onSelectGroup}
      >
        <img className="group-img" src="/no_image.jpg" width="60" height="60" alt="전체" />
        <div className="group-name">전체</div>
      </li>
      
      {groups.groups.map(group => 
        <li
          className={classNames({"active": state.select.groupId === group.groupId})}
          key={group.groupId}
          value={group.groupId}
          onClick={onSelectGroup}
        >
          <img className="group-img" src={groupImage(group.imageName)} width="60" height="60" alt={group.name} />
          <div className="group-name">{group.name}</div>
        </li>
      )}

    </ul>
  );
}

export default Success;