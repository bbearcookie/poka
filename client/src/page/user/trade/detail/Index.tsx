import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Location } from '@type/navigate';
import useTradeQuery from '@api/query/trade/useTradeQuery';
import BackLabel from '@component/label/BackLabel';
import Success from './Success';
import './Index.scss';

interface Props {}

function Index({  }: Props) {
  const { tradeId } = useParams() as any;
  const location = useLocation() as Location;
  const { data: trade, status } = useTradeQuery(tradeId);

  return (
    <main className="UserTradeDetailPage">
      <Back backURL={location.state?.backURL} />
      {status === 'success' && <Success trade={trade} />}
    </main>
  );
}

function Back({ backURL }: { backURL?: string; }) {
  if (backURL) {
    if (/voucher/.test(backURL)) return <BackLabel to={backURL} styles={{ marginBottom: "2em" }}>소유권 상세정보</BackLabel>
  }

  return <BackLabel to="/trade/list" styles={{ marginBottom: "2em" }}>교환글 목록</BackLabel>
}

export default Index;