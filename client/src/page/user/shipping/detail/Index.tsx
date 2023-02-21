import React from 'react';
import { useParams } from 'react-router-dom';
import useShippingRequestQuery from '@api/query/shipping/useShippingRequestQuery';
import BackLabel from '@component/label/BackLabel';
import Success from './Success';
import './Index.scss';

interface Props {

}
const DefaultProps = {};

function Index({  }: Props) {
  const { requestId } = useParams() as any;
  const { data: shipping, status } = useShippingRequestQuery(requestId);

  return (
    <div className="ShippingDetailPage">
      <BackLabel styles={{ marginBottom: "1em" }}>배송 요청 목록</BackLabel>
      {status === 'success' && <Success res={shipping} />}
    </div>
  );
}

export default Index;