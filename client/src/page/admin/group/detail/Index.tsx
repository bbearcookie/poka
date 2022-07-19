import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import * as groupAPI from '@api/groupAPI';
import * as queryKey from '@util/queryKey';
import { ErrorType } from '@util/commonAPI';
import { AxiosError, AxiosResponse } from 'axios';
import BackLabel from '@component/label/BackLabel';
import ErrorCard from '@component/card/ErrorCard';
import Success from './Success';
import Skeleton from './Skeleton';
import './Index.scss';

interface GroupDetailPageProps {
  children?: React.ReactNode;
}

const GroupDetailPageDefaultProps = {};

function GroupDetailPage({ children }: GroupDetailPageProps & typeof GroupDetailPageDefaultProps) {
  const { groupId } = useParams() as any;
  const { status, data: group, error } =
  useQuery<AxiosResponse<typeof groupAPI.getGroupDetail.resType>, AxiosError<ErrorType>>
  (queryKey.groupKeys.detail(groupId), groupAPI.getGroupDetail.axios(groupId));

  return (
    <div className="GroupDetailPage">
      <BackLabel to="/admin/group/list">그룹 목록</BackLabel>
      {status === 'error' && <ErrorCard error={error} /> }
      {status === 'loading' && <Skeleton /> }
      {status === 'success' && <Success group={group} groupId={groupId} /> }
    </div>
  );
}

GroupDetailPage.defaultProps = GroupDetailPageDefaultProps;

export default GroupDetailPage;