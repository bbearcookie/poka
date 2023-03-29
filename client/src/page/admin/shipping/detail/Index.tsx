import React from 'react';
import { useParams } from 'react-router-dom';
import useShippingRequestQuery from '@api/query/shipping/useShippingRequestQuery';
import BackLabel from '@component/label/BackLabel';
import Success from './Success';
import './Index.scss';

function Index() {
  const requestId = Number(useParams().requestId);
  const { data: shipping, status } = useShippingRequestQuery(requestId);

  return (
    <main className="AdminShippingDetailPage">
      <BackLabel to="/admin/shipping/list" styles={{ marginBottom: "1em" }}>배송 요청 목록</BackLabel>
      {status === 'success' && <Success res={shipping} />}
    </main>
  );
}

export default Index;