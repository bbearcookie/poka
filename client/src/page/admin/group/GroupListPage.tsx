import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import Button from '@component/form/basic/Button';
import Table from '@component/table/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
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
            <th>이름</th>
            <th>멤버</th>
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

function GroupList({  }) {
  const { status, data: groups, error } = 
  useQuery<AxiosResponse<typeof groupAPI.getAllGroupList.resType>>
  (queryKey.groupKeys.all, groupAPI.getAllGroupList.axios);

  console.log(status);

  if (status === 'loading') {
    return <span>Loading...</span>;
  }

  return (
    <>
      {groups?.data?.groups.map((item, idx) => (
        <tr key={idx}>
        <td>
          <section className="name-section">
            <img src={`http://localhost:5000/image/group/${item.image_name}`} width="60" height="60" alt={item.name} />
            <span>{item.name}</span>
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



// const data = [
//   {
//     imgSrc: '/izone.png',
//     name: '아이즈원',
//     memberNum: 5,
//   },
//   {
//     imgSrc: '/bts.png',
//     name: 'BTS',
//     memberNum: 3,
//   },
//   {
//     imgSrc: '/twice.png',
//     name: '트와이스',
//     memberNum: 7,
//   },
// ]