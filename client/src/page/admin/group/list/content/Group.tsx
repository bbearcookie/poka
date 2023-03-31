import React from 'react';
import { groupImage } from '@api/resource';
import { Link } from 'react-router-dom';
import IconButton from '@component/form/IconButton';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { StyledGroup } from './_styles';

interface Props {
  groupId: number;
  name: string;
  imageName: string;
  memberCount: number;
}

function Group({ groupId, name, imageName, memberCount }: Props) {
  return (
    <StyledGroup>
      <td>
        <Link className="name-section" to={`/admin/group/detail/${groupId}`}>
          <img src={groupImage(imageName)} width="60" height="60" alt={name} />
          <span>{name}</span>
        </Link>
      </td>
      <td>{memberCount}명</td>
      <td>
        <Link className="action-section" to={`/admin/group/detail/${groupId}`}>
          <IconButton icon={faArrowRight} />
        </Link>
      </td>
    </StyledGroup>
  );
}

export default Group;