import React from 'react';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { BACKEND } from '@util/commonAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import * as groupAPI from '@api/groupAPI';

interface GroupListProps {
  groups: AxiosResponse<typeof groupAPI.getAllGroupList.resType>;
  children?: React.ReactNode;
}

const GroupListDefaultProps = {};

function GroupList({ groups, children }: GroupListProps & typeof GroupListDefaultProps) {
  return (
    <>
      {groups.data?.groups.map((item, idx) => (
        <tr key={idx}>
          <td>
            <section className="name-section">
              <Link className="name-section" to={`/admin/group/detail/${item.group_id}`}>
                <img src={`${BACKEND}/image/group/${item.image_name}`} width="60" height="60" alt={item.name} />
                <span className="name">{item.name}</span>
              </Link>
            </section>
          </td>
          <td>{item.member_cnt}명</td>
          <td>
            <section className="action-section">
              <Link to={`/admin/group/detail/${item.group_id}`}>
                <div className="icon-button">
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </Link>
            </section>
          </td>
        </tr>
      ))}
    </>
  );
}

GroupList.defaultProps = GroupListDefaultProps;

export default GroupList;