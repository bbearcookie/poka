import React from 'react';
import classNames from 'classnames';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Button from '@component/form/basic/Button';
import Table from '@component/table/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AxiosError, AxiosResponse } from 'axios';
import { BACKEND, ErrorType } from '@util/commonAPI';
import * as queryKey from '@util/queryKey';
import * as groupAPI from '@api/groupAPI';
import './GroupListPage.scss';

interface GroupListPageProps {
  children?: React.ReactNode;
}

const GroupListPageDefaultProps = {};

function GroupListPage({ children }: GroupListPageProps & typeof GroupListPageDefaultProps) {
  const { status, data: groups, error } = 
  useQuery<AxiosResponse<typeof groupAPI.getAllGroupList.resType>, AxiosError<ErrorType>>
  (queryKey.groupKeys.all, groupAPI.getAllGroupList.axios);

  return (
    <section className="GroupListPage">
      <div className="title-label-section">
        <h1 className="title-label">그룹 목록</h1>
        <Link to="/admin/group/writer">
          <Button theme="primary" padding="0.7em 1.3em" iconMargin="1em" leftIcon={faPlus}>추가</Button>
        </Link>
      </div>

      <Table className={classNames({"skeleton": status === 'loading'})}>
        <thead>
          <tr>
            <th className="name">이름</th>
            <th className="member">멤버</th>
            <th className="action">액션</th>
          </tr>
        </thead>
        <tbody>
          {status === 'loading' && <Skeleton />}
          {status === 'success' && <GroupList groups={groups} />}
          {status === 'error' && <p>{error.response?.data.message}</p>}
        </tbody>
      </Table>

    </section>
  );
}

GroupListPage.defaultProps = GroupListPageDefaultProps;
export default GroupListPage;

// 스켈레톤 UI
function Skeleton() {
  return (
    <>
    {Array.from({length: 8}).map((_, idx) => (
      <tr key={idx}>
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

// 로딩 완료 UI
interface GroupListProps {
  groups: AxiosResponse<typeof groupAPI.getAllGroupList.resType>;
}

function GroupList({ groups }: GroupListProps) {
  return (
    <>
    {groups?.data?.groups.map((item, idx) => (
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