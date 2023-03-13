import React from 'react';
import Card, { StylesProps as CardStyles } from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import PhotoCard from '@component/photocard/photo/PhotoCard';
import { ItemSection } from '@component/list/content/_styles';
import { VoucherType } from '@type/voucher';
import { IconType } from '@type/icon';

interface Props {
  vouchers: VoucherType[];
  icon?: IconType;
  handleClick?: (id: number) => void;
  cardStyles?: CardStyles;
}

function RequestVoucherInfo({ vouchers, icon, handleClick, cardStyles }: Props) {
  return (
    <Card styles={cardStyles}>
      <CardHeader>
        <h1 className="title">요청한 소유권</h1>
      </CardHeader>
      <CardBody>
        <ItemSection>
          {vouchers.map(voucher =>
            <PhotoCard
              {...voucher}
              key={voucher.voucherId}
              photoName={voucher.name}
              icon={icon}
              handleClick={handleClick}
          />)}
        </ItemSection>
      </CardBody>
    </Card>
  );
}

export default RequestVoucherInfo;