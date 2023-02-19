import React from 'react';
import { useParams } from 'react-router-dom';
import useShippingRequestQuery from '@api/query/shipping/useShippingRequestQuery';
import BackLabel from '@component/label/BackLabel';
import './Index.scss';

interface Props {

}
const DefaultProps = {};

function Index({  }: Props) {
  const { requestId } = useParams() as any;
  const { data: shipping, status } = useShippingRequestQuery(requestId);

  console.log(shipping?.shipping);
  console.log(shipping?.vouchers);

  return (
    <div className="ShippingDetailPage">
      <BackLabel>배송 요청 목록</BackLabel>
      배송요청 상세 페이지
    </div>
  );
}

export default Index;