import React from 'react';
import useVoucherQuery from '@api/query/voucher/useVoucherQuery';
import { useParams } from 'react-router-dom';
import BackLabel from '@component/label/BackLabel';
import Success from './Success';
import './Index.scss';

interface Props {}
const DefaultProps = {};

function Index({  }: Props) {
  const { voucherId } = useParams() as any;
  const { status, data: voucher, error } = useVoucherQuery(voucherId);

  return (
    <div className="UserVoucherDetailPage">
      <BackLabel to="/voucher/list" styles={{ marginBottom: "2em" }}>소유권 목록</BackLabel>
      {status === 'success' && <Success voucher={voucher} />}
    </div>
  );
}

export default Index;