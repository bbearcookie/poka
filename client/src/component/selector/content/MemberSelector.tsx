import React, { useCallback } from 'react';
import classNames from 'classnames';
import useGroupQuery from '@api/query/group/useGroupQuery';
import { StyledMemberSelector } from '../_styles';

interface Props {
  groupId: number;
  memberId: number;
  setMemberId: React.Dispatch<React.SetStateAction<number>>;
}

function MemberSelector({ groupId, memberId, setMemberId }: Props) {
  const { data: group, status } = useGroupQuery(groupId);

  const onSelectMember = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      const memberId = e.currentTarget.value;
      setMemberId(memberId);
    },
    [setMemberId]
  );

  if (status !== 'success') return <></>;

  return (
    <StyledMemberSelector>
      {groupId !== 0 && (
        <li
          className={classNames('member-item', { active: memberId === 0 })}
          value={0}
          onClick={onSelectMember}
        >
          전체
        </li>
      )}

      {group.members.map(member => (
        <li
          className={classNames('member-item', { active: memberId === member.memberId })}
          value={member.memberId}
          key={member.memberId}
          onClick={onSelectMember}
        >
          {member.name}
        </li>
      ))}
    </StyledMemberSelector>
  );
}

export default MemberSelector;
