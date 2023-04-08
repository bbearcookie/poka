import { useParams } from 'react-router-dom';
import useGroupQuery from '@api/query/group/useGroupQuery';
import BackLabel from '@component/label/BackLabel';
import ErrorCard from '@component/card/ErrorCard';
import Success from './Success';
import Loading from './Loading';
import GroupContext from './GroupContext';
import { StyledIndex } from './_styles';

function Index() {
  const groupId = Number(useParams().groupId);
  const { status, data: group, error } = useGroupQuery(groupId);

  return (
    <StyledIndex>
      <BackLabel to="/admin/group/list" css={{ marginBottom: '2em' }}>
        그룹 목록
      </BackLabel>
      {status === 'success' && (
        <GroupContext.Provider value={group}>
          <Success />
        </GroupContext.Provider>
      )}
      {status === 'error' && <ErrorCard error={error} css={{ marginBottom: '5em' }} />}
      {status === 'loading' && <Loading />}
    </StyledIndex>
  );
}

export default Index;
