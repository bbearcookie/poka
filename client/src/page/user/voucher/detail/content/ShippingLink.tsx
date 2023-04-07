import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@component/form/Button';
import { ResType } from '@api/query/voucher/useVoucherQuery';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';

interface Props {
  res: ResType;
}

function ShippingLink({ res }: Props) {
  return (
    <Link to={`/shipping/writer?voucherId=${res.voucherId}`}>
      <Button buttonTheme="pink" leftIcon={faTruckFast} iconMargin="3.6em">
        배송 요청하기
      </Button>
    </Link>
  );
}

export default ShippingLink;
