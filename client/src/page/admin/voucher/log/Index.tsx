import { useParams } from 'react-router-dom';
import BackLabel from '@component/label/BackLabel';
import LogList from './content/LogList';
import './Index.scss';

function Index() {
  const { voucherId } = useParams() as any;

  return (
    <main className="VoucherLogPage">
      <BackLabel to={`/admin/voucher/detail/${voucherId}`} styles={{ marginBottom: "2em" }}>소유권 상세정보</BackLabel>
      <LogList voucherId={voucherId} />
    </main>
  );
}

export default Index;