import { useParams } from 'react-router-dom';
import usePhotoQuery from '@api/query/photo/usePhotoQuery';
import BackLabel from '@component/label/BackLabel';
import Success from './Success';
import { StyledIndex } from './_styles';

function Index() {
  const photocardId = Number(useParams().photocardId);
  const { status, data: photo } = usePhotoQuery(photocardId);

  return (
    <StyledIndex>
      <BackLabel to="/admin/photo/list" styles={{ marginBottom: '2em' }}>
        포토카드 목록
      </BackLabel>
      {status === 'success' && <Success photo={photo} photocardId={photocardId} />}
    </StyledIndex>
  );
}

export default Index;
