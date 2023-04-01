import { useParams } from 'react-router-dom';
import BackLabel from '@component/label/BackLabel';
import VoucherLogList from '@component/list/voucher/VoucherLogList';
import { StyledIndex } from './_styles';

function Index() {
  const voucherId = Number(useParams().voucherId);

  return (
    <StyledIndex>
      <BackLabel to={`/admin/voucher/detail/${voucherId}`} styles={{ marginBottom: "2em" }}>소유권 상세정보</BackLabel>
      <VoucherLogList voucherId={voucherId} />
    </StyledIndex>
  );
}

export default Index;