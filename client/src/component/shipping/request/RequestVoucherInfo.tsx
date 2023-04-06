import React from 'react';
import { Card, CardHeader, CardBody } from '@component/card/basic/_styles';
import PhotocardItem from '@component/photocard/item/PhotocardItem';
import { ItemSection } from '@component/list/content/_styles';
import { VoucherItem } from '@type/voucher';
import { IconType } from '@type/icon';
import { CSSProp } from 'styled-components';

interface Props {
  vouchers: VoucherItem[];
  icon?: IconType;
  handleClick?: (id: number) => void;
  cssProp?: CSSProp;
}

function RequestVoucherInfo({
  vouchers,
  icon,
  handleClick,
  cssProp
}: Props) {
  return (
    <Card css={cssProp}>
      <CardHeader>
        <h1 className="title">요청한 소유권</h1>
      </CardHeader>
      <CardBody>
        <ItemSection templateColumnsSize="minmax(11.25em, 1fr)">
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
