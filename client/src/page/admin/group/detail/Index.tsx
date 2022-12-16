import React from 'react';
import { useParams } from 'react-router-dom';
import useGroupQuery from '@api/query/group/useGroupQuery';
import BackLabel from '@component/label/BackLabel';
import ErrorCard from '@component/card/ErrorCard';
import Success from './Success';
import Loading from './Loading';
import './Index.scss';

interface Props {}
const DefaultProps = {};

function GroupDetailPage({  }: Props) {
  const { groupId } = useParams() as any;
  const { status, data: group, error } = useGroupQuery(groupId);

  return (
    <div className="GroupDetailPage">
      <BackLabel to="/admin/group/list" styles={{ marginBottom: "2em" }}>그룹 목록</BackLabel>
      {status === 'success' && <Success group={group} groupId={groupId} /> }
      {status === 'error' && <ErrorCard error={error} /> }
      {status === 'loading' && <Loading /> }
    </div>
  );
}

export default GroupDetailPage;