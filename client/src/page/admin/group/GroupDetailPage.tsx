import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import * as memberAPI from '@api/memberAPI';
import * as queryKey from '@util/queryKey';
import { ErrorType } from '@util/commonAPI';
import './GroupDetailPage.scss';
import { AxiosError, AxiosResponse } from 'axios';

interface GroupDetailPageProps {
  children?: React.ReactNode;
}

const GroupDetailPageDefaultProps = {};

function GroupDetailPage({ children }: GroupDetailPageProps & typeof GroupDetailPageDefaultProps) {
  const { groupId } = useParams() as any;
  const { status, data: group, error } = 
  useQuery<AxiosResponse<typeof memberAPI.getMembersOfGroup.resType>, AxiosError<ErrorType>>
  (queryKey.groupKeys.members(groupId), memberAPI.getMembersOfGroup.axios(groupId));

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.response?.data.message}</span>
  }

  if (status === 'success') {
    console.log(group.data);
  }

  return (
    <div className="GroupDetailPage">
      {groupId}
    </div>
  );
}

GroupDetailPage.defaultProps = GroupDetailPageDefaultProps;

export default GroupDetailPage;