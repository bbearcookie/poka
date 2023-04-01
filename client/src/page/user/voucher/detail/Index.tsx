import useVoucherQuery from '@api/query/voucher/useVoucherQuery';
import { useParams } from 'react-router-dom';
import BackLabel from '@component/label/BackLabel';
import Success from './Success';
import { StyledIndex } from './_styles';

function Index() {
  const voucherId = Number(useParams().voucherId);
  const { status, data: voucher } = useVoucherQuery(voucherId);

  return (
    <StyledIndex>
      <BackLabel to="/voucher/list" styles={{ marginBottom: '2em' }}>
        소유권 목록
      </BackLabel>
      {status === 'success' && <Success res={voucher} />}
    </StyledIndex>
  );
}

export default Index;
