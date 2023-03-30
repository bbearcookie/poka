import React, { useCallback } from 'react';
import classNames from 'classnames';
import useGroupsQuery from '@api/query/group/useGroupsQuery';
import { groupImage } from '@api/resource';
import { StyledGroupSelector } from '../_styles';

interface Props {
  groupId: number;
  setGroupId: React.Dispatch<React.SetStateAction<number>>;
  setMemberId: React.Dispatch<React.SetStateAction<number>>;
}

function GroupSelector({ groupId, setGroupId, setMemberId }: Props) {
  const { data: groups, status } = useGroupsQuery();

  const onSelectGroup = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      const groupId = e.currentTarget.value;
      setGroupId(groupId);
      setMemberId(0);
    },
    [setGroupId, setMemberId]
  );

  return (
    <StyledGroupSelector>
      <li
        className={classNames('group-item', { active: groupId === 0 })}
        value={0}
        onClick={onSelectGroup}
      >
        <img className="img" src="/no_image.jpg" alt="전체" />
        <p className="name">전체</p>
      </li>

      {status === 'success' &&
        groups.groups.map(group => (
          <li
            className={classNames('group-item', { active: groupId === group.groupId })}
            key={group.groupId}
            value={group.groupId}
            onClick={onSelectGroup}
          >
            <img className="img" src={groupImage(group.imageName)} alt={group.name} />
            <p className="name">{group.name}</p>
          </li>
        ))}
    </StyledGroupSelector>
  );
}

export default GroupSelector;
