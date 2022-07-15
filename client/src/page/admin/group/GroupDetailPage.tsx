import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import * as groupAPI from '@api/groupAPI';
import * as queryKey from '@util/queryKey';
import { ErrorType } from '@util/commonAPI';
import { AxiosError, AxiosResponse } from 'axios';
import './GroupDetailPage.scss';

interface GroupDetailPageProps {
  children?: React.ReactNode;
}

const GroupDetailPageDefaultProps = {};

function GroupDetailPage({ children }: GroupDetailPageProps & typeof GroupDetailPageDefaultProps) {
  const { groupId } = useParams() as any;
  const { status, data: group, error } =
  useQuery<AxiosResponse<typeof groupAPI.getGroupDetail.resType>, AxiosError<ErrorType>>
  (queryKey.groupKeys.detail(groupId), groupAPI.getGroupDetail.axios(groupId));

  if (status === 'loading') {
    return (
      <div className="GroupDetailPage">
        <span>Loading...</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="GroupDetailPage">
        <span>Error: {error.response?.data.message}</span>
      </div>
    );
  }

  if (status === 'success') {
    console.log(group.data);

    return (
      <div className="GroupDetailPage">
        {groupId}
      </div>
    );
  }
  
  return (<div></div>);
}

GroupDetailPage.defaultProps = GroupDetailPageDefaultProps;

export default GroupDetailPage;