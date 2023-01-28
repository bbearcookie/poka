import React from 'react';
import { Link } from 'react-router-dom';
import { groupImage } from '@api/resource';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@component/form/IconButton';
import TableBodyItem from '@component/table/TableBodyItem';
import { ResType as GroupsType } from '@api/query/group/useGroupsQuery';

interface Props {
  groups: GroupsType;
}
const DefaultProps = {};

function GroupList({ groups }: Props) {
  return (
    <>
      {groups?.groups.map((item, idx) => (
        <tr key={idx}>
          <TableBodyItem styles={{ paddingLeft: "1.5em" }}>
            <Link className="name-section" to={`/admin/group/detail/${item.groupId}`}>
              <img src={groupImage(item.imageName)} width="60" height="60" alt={item.name} />
              <span className="name">{item.name}</span>
            </Link>
          </TableBodyItem>
          <TableBodyItem>{item.memberCount}명</TableBodyItem>
          <TableBodyItem styles={{ paddingRight: "1.5em" }}>
            <Link className="action-section" to={`/admin/group/detail/${item.groupId}`}>
              <IconButton icon={faArrowRight} />
            </Link>
          </TableBodyItem>
        </tr>
      ))}
    </>
  );
}

export default GroupList;