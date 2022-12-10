import React from 'react';
import { Link } from 'react-router-dom';
import { groupImage } from '@api/resource';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@component/form/IconButton';
import TableBodyItem from '@component/table/TableBodyItem';
import * as groupAPI from '@api/groupAPI';

interface GroupListProps {
  groups: typeof groupAPI.getAllGroupList.resType;
  children?: React.ReactNode;
}
const GroupListDefaultProps = {};

function GroupList({ groups, children }: GroupListProps & typeof GroupListDefaultProps) {
  return (
    <>
      {groups?.groups.map((item, idx) => (
        <tr key={idx}>
          <TableBodyItem styles={{ paddingLeft: "1.5em" }}>
            <Link className="name-section" to={`/admin/group/detail/${item.group_id}`}>
              <img src={groupImage(item.image_name)} width="60" height="60" alt={item.name} />
              <span className="name">{item.name}</span>
            </Link>
          </TableBodyItem>
          <TableBodyItem>{item.member_cnt}명</TableBodyItem>
          <TableBodyItem styles={{ paddingRight: "1.5em" }}>
            <Link className="action-section" to={`/admin/group/detail/${item.group_id}`}>
              <IconButton icon={faArrowRight} />
            </Link>
          </TableBodyItem>
        </tr>
      ))}
    </>
  );
}

GroupList.defaultProps = GroupListDefaultProps;
export default GroupList;