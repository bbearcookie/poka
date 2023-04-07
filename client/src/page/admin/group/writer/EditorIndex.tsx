import useGroupQuery from '@api/query/group/useGroupQuery';
import { useParams } from 'react-router-dom';
import { groupImage } from '@api/resource';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import Form from './Form';
import './Index.scss';

function Index() {
  const groupId = Number(useParams().groupId);
  const { status, data: group, error } = useGroupQuery(groupId);

  return (
    <main className="GroupWriterPage">
      <TitleLabel title="그룹 수정" styles={{ marginBottom: "1em" }} />
      {status === 'success' && <Form groupId={groupId} name={group?.name} imageName={groupImage(group?.imageName)} />}
    </main>
  );
}

export default Index;