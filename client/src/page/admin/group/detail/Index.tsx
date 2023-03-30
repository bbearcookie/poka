import React from 'react';
import { useParams } from 'react-router-dom';
import useGroupQuery from '@api/query/group/useGroupQuery';
import BackLabel from '@component/label/BackLabel';
import ErrorCard from '@component/card/ErrorCard';
import Success from './Success';
import Loading from './Loading';
import './Index.scss';

function GroupDetailPage() {
  const groupId = Number(useParams().groupId);
  const { status, data: group, error } = useGroupQuery(groupId);

  return (
    <main className="GroupDetailPage">
      <BackLabel to="/admin/group/list" styles={{ marginBottom: "2em" }}>그룹 목록</BackLabel>
      {status === 'success' && <Success res={group} groupId={groupId} /> }
      {status === 'error' && <ErrorCard error={error} /> }
      {status === 'loading' && <Loading />}
    </main>
  );
}

export default GroupDetailPage;