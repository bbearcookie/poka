import React from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ResType } from '@api/query/shipping/useShippingRequestQuery';
import PhotoCard from '@component/photocard/photo/PhotoCard';
import ItemSection from '@component/list/common/ItemSection';

interface Props {
  res: ResType;
}
const DefaultProps = {};

function VoucherSection({ res }: Props) {
  return (
    <Card className="VoucherSection">
      <CardHeader>
        <h1 className="title">요청한 소유권</h1>
      </CardHeader>
      <CardBody>
        <ItemSection>
          {res.vouchers.map(voucher =>
            <PhotoCard
              {...voucher}
              key={voucher.voucherId}
              photoName={voucher.name}
              icon={{ svg: faArrowRight, tooltip: '상세 보기' }}
          />)}
        </ItemSection>
      </CardBody>
    </Card>
  );
}

export default VoucherSection;