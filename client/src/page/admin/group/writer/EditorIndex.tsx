import React from 'react';
import useGroupQuery from '@api/query/group/useGroupQuery';
import { useParams } from 'react-router-dom';
import { groupImage } from '@api/resource';
import Form from './Form';
import './Index.scss';

interface Props {}
const DefaultProps = {};

function GroupEditorPage({  }: Props) {
  const { groupId } = useParams() as any;
  const { status, data: group, error } = useGroupQuery(groupId);

  return (
    <div className="GroupWriterPage">
      <h1 className="title-label">그룹 수정</h1>
      {status === 'success' && <Form groupId={groupId} name={group?.name} imageName={groupImage(group?.image_name)} />}
    </div>
  );
}

export default GroupEditorPage;