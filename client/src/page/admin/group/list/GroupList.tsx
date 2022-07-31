import React from 'react';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { BACKEND } from '@util/commonAPI';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@component/form/IconButton';
import TableBodyItem from '@component/table/TableBodyItem';
import * as groupAPI from '@api/groupAPI';

interface GroupListProps {
  groups: AxiosResponse<typeof groupAPI.getAllGroupList.resType>;
  children?: React.ReactNode;
}

const GroupListDefaultProps = {};

function GroupList({ groups, children }: GroupListProps & typeof GroupListDefaultProps) {
  return (
    <>
      {groups?.data?.groups.map((item, idx) => (
        <tr key={idx}>
          <TableBodyItem styles={{ paddingLeft: "1.5em" }}>
            <Link className="name-section" to={`/admin/group/detail/${item.group_id}`}>
              <img src={`${BACKEND}/image/group/${item.image_name}`} width="60" height="60" alt={item.name} />
              <span className="name">{item.name}</span>
            </Link>
          </TableBodyItem>
          <TableBodyItem>{item.member_cnt}명</TableBodyItem>
          <TableBodyItem styles={{ paddingLeft: "1.5em" }}>
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