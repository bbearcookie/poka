import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@component/form/Button';
import Table from '@component/table/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './GroupListPage.scss';

const data = [
  {
    imgSrc: '/izone.png',
    name: '아이즈원',
    memberNum: 5,
  },
  {
    imgSrc: '/bts.png',
    name: 'BTS',
    memberNum: 3,
  },
  {
    imgSrc: '/twice.png',
    name: '트와이스',
    memberNum: 7,
  },
]

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
          {data.map((item, idx) => (
            <tr key={idx}>
              <td>
                <section className="name-section">
                  <img src={item.imgSrc} width="60" height="60" alt={item.name} />
                  <span>{item.name}</span>
                </section>
              </td>
              <td>{item.memberNum}명</td>
              <td>
                <section className="action-section">
                  <div className="icon-button">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                </section>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    </section>
  );
}

GroupListPage.defaultProps = GroupListPageDefaultProps;

export default GroupListPage;