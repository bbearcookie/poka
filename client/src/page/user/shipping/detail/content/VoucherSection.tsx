import React from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ResType } from '@api/query/shipping/useShippingRequestQuery';
import PhotoCard from '@component/photocard/photo/PhotoCard';

interface Props {
  res: ResType;
}
const DefaultProps = {};

function VoucherSection({ res }: Props) {
  console.log(res.vouchers);

  return (
    <Card>
      <CardHeader>
        <h1 className="title">요청한 소유권</h1>
      </CardHeader>
      <CardBody>
        {res.vouchers.map(voucher =>
          <PhotoCard
            {...voucher}
            photoName={voucher.name}
            icon={{ svg: faArrowRight, tooltip: '상세 보기' }}
          />)}
      </CardBody>
    </Card>
  );
}

export default VoucherSection;