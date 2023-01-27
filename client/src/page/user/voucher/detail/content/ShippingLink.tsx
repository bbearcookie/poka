import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@component/form/Button';
import { ResType as VoucherResType } from '@api/query/voucher/useVoucherQuery';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';

interface Props {
  voucher: VoucherResType;
}
const DefaultProps = {};

function ShippingLink({ voucher }: Props) {
  return (
    <Link to={`/shipping/writer?voucherId=${voucher.voucher_id}`}>
      <Button
        leftIcon={faTruckFast}
        styles={{
          theme: "pink",
          iconMargin: "3.6em"
        }}
      >배송 요청하기</Button>
    </Link>
  );
}

export default ShippingLink;