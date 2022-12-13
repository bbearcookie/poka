import React from 'react';
import { useParams } from 'react-router-dom';
import BackLabel from '@component/label/BackLabel';
import LogList from './content/LogList';
import './Index.scss';

interface Props {}
const DefaultProps = {};

function Index({  }: Props) {
  const { voucherId } = useParams() as any;

  return (
    <div className="VoucherLogPage">
      <BackLabel to={`/admin/voucher/detail/${voucherId}`} styles={{ marginBottom: "2em" }}>소유권 상세정보</BackLabel>
      <LogList voucherId={voucherId} />
    </div>
  );
}

export default Index;