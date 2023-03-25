import React from 'react';
import Card, { StylesProps as CardStyles } from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import PhotocardItem from '@component/photocard/new/item/PhotocardItem';
import { ItemSection } from '@component/list/content/_styles';
import { VoucherItem } from '@type/voucher';
import { IconType } from '@type/icon';

interface Props {
  vouchers: VoucherItem[];
  icon?: IconType;
  handleClick?: (id: number) => void;
  cardStyles?: CardStyles;
}

function RequestVoucherInfo({
  vouchers,
  icon,
  handleClick,
  cardStyles,
}: Props) {
  return (
    <Card styles={cardStyles}>
      <CardHeader>
        <h1 className="title">요청한 소유권</h1>
      </CardHeader>
      <CardBody>
        <ItemSection>
          {vouchers.map((v) => (
            <PhotocardItem
              {...v.photo}
              key={v.voucherId}
              icon={icon}
              onClick={handleClick}
            />
          ))}
        </ItemSection>
      </CardBody>
    </Card>
  );
}

export default RequestVoucherInfo;
