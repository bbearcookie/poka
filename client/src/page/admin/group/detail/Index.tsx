import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import * as groupAPI from '@api/groupAPI';
import * as queryKey from '@util/queryKey';
import { ErrorType } from '@util/request';
import { AxiosError } from 'axios';
import BackLabel from '@component/label/BackLabel';
import ErrorCard from '@component/card/ErrorCard';
import Success from './Success';
import Loading from './Loading';
import './Index.scss';

interface Props {}
const DefaultProps = {};

function GroupDetailPage({  }: Props) {
  const { groupId } = useParams() as any;
  const { status, data: group, error } =
  useQuery<typeof groupAPI.getGroupDetail.resType, AxiosError<ErrorType>>
  (queryKey.groupKeys.detail(groupId), () => groupAPI.getGroupDetail.axios(groupId));

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