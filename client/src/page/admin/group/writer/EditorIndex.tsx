import React from 'react';
import useGroupQuery from '@api/query/group/useGroupQuery';
import { useParams } from 'react-router-dom';
import { groupImage } from '@api/resource';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import Form from './Form';
import './Index.scss';

interface Props {}

function GroupEditorPage({  }: Props) {
  const { groupId } = useParams() as any;
  const { status, data: group, error } = useGroupQuery(groupId);

  return (
    <div className="GroupWriterPage">
      <TitleLabel title="그룹 수정" styles={{ marginBottom: "1em" }} />
      {status === 'success' && <Form groupId={groupId} name={group?.name} imageName={groupImage(group?.imageName)} />}
    </div>
  );
}

export default GroupEditorPage;