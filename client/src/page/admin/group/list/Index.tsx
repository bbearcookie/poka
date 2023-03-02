import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@component/form/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import useGroupsQuery from '@api/query/group/useGroupsQuery';
import SkeletonGroup from './content/SkeletonGroup';
import Table from '@component/table/new/Table';
import Group from './content/Group';
import Col from '@component/table/new/styles/Col';
import { getErrorMessage } from '@util/request';
import './Index.scss';

interface Props {}
const DefaultProps = {};

function GroupListPage({  }: Props) {
  const { status, data: groups, error } = useGroupsQuery();

  return (
    <section className="GroupListPage">
      <div className="title-label-section">
        <h1 className="title-label">그룹 목록</h1>
        <Link to="/admin/group/writer">
          <Button
            leftIcon={faPlus}
            styles={{
              theme: "primary",
              padding: "0.7em 1.3em",
              iconMargin: "1em"
            }}
          >추가</Button>
        </Link>
      </div>

      <Table styles={{ itemHeight: "3em", itemPadding: "1em" }}>
        <colgroup>
          <Col width="60%" />
          <Col width="25%" />
          <Col width="15%" />
        </colgroup>
        <thead>
          <tr>
            <th>이름</th>
            <th>멤버</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {status === 'loading' && Array.from({ length: 10 }).map((_, i) => <SkeletonGroup key={i} />)}
          {status === 'success' && groups.groups.map(g => <Group key={g.groupId} {...g} />)}
          {status === 'error' && <tr><td>{getErrorMessage(error)}</td></tr>}
        </tbody>
      </Table>

    </section>
  );
}

export default GroupListPage;