import React from 'react';
import { useQuery } from '@tanstack/react-query';
import * as groupAPI from '@api/groupAPI';
import * as queryKey from '@util/queryKey';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import { groupImage } from '@api/resource';
import Form from './Form';
import './Index.scss';

interface Props {}
const DefaultProps = {};

function GroupEditorPage({  }: Props) {
  const { groupId } = useParams() as any;
  const { status, data: group, error } =
  useQuery<typeof groupAPI.getGroupDetail.resType, AxiosError<ErrorType>>
  (queryKey.groupKeys.detail(groupId), () => groupAPI.getGroupDetail.axios(groupId));

  return (
    <div className="GroupWriterPage">
      <h1 className="title-label">그룹 수정</h1>
      {status === 'success' && <Form groupId={groupId} name={group?.name} imageName={groupImage(group?.image_name)} />}
    </div>
  );
}

export default GroupEditorPage;