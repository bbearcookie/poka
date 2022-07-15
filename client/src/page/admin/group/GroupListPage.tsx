import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import Button from '@component/form/basic/Button';
import Table from '@component/table/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { BACKEND } from '@util/commonAPI';
import * as queryKey from '@util/queryKey';
import * as groupAPI from '@api/groupAPI';
import './GroupListPage.scss';

interface GroupListPageProps {
  children?: React.ReactNode;
}

const GroupListPageDefaultProps = {};

function GroupListPage({ children }: GroupListPageProps & typeof GroupListPageDefaultProps) {
  return (
    <section className="GroupListPage">
      <div className="title-label-section">
        <h1 className="title-label">그룹 목록</h1>
        <Link to="/admin/group/writer">
          <Button theme="primary" padding="0.7em 1.3em" iconMargin="1em" leftIcon={faPlus}>추가</Button>
        </Link>
      </div>

      <Table>
        <thead>
          <tr>
            <th className="name">이름</th>
            <th className="member">멤버</th>
            <th className="action">액션</th>
          </tr>
        </thead>
        <tbody>
          <GroupList />
        </tbody>
      </Table>

    </section>
  );
}

GroupListPage.defaultProps = GroupListPageDefaultProps;

export default GroupListPage;

function GroupList() {
  const { status, data: groups, error } = 
  useQuery<AxiosResponse<typeof groupAPI.getAllGroupList.resType>>
  (queryKey.groupKeys.all, groupAPI.getAllGroupList.axios);

  if (status === 'loading') {
    return (
      <>
      {Array.from({length: 9}).map((_, idx) => (
        <tr className="skeleton" key={idx}>
          <td>
            <section className="name-section">
              <span className="image" />
              <span className="name" />
            </section>
          </td>
          <td>
            <span className="member-count" />
          </td>
          <td>
            <section className="action-section">
              <span className="icon-button" />
            </section>
          </td>
        </tr>
      ))}
      </>
    )
  }

  return (
    <>
    {groups?.data?.groups.map((item, idx) => (
      <tr key={idx}>
        <td>
          <section className="name-section">
            <img src={`${BACKEND}/image/group/${item.image_name}`} width="60" height="60" alt={item.name} />
            <span className="name">{item.name}</span>
          </section>
        </td>
        <td>{item.member_cnt}명</td>
        <td>
          <section className="action-section">
            <div className="icon-button">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </section>
        </td>
      </tr>
    ))}
    </>
  );
}