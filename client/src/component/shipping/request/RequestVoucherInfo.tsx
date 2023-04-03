import React from 'react';
import { CardHeader, CardBody } from '@component/card/basic/_styles';
import PhotocardItem from '@component/photocard/item/PhotocardItem';
import { ItemSection } from '@component/list/content/_styles';
import { VoucherItem } from '@type/voucher';
import { IconType } from '@type/icon';
import { RequestVoucherInfo as StyledRequestVoucherInfo } from './_styles';

interface Props {
  vouchers: VoucherItem[];
  icon?: IconType;
  handleClick?: (id: number) => void;
}

function RequestVoucherInfo({
  vouchers,
  icon,
  handleClick,
}: Props) {
  return (
    <StyledRequestVoucherInfo>
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
    </StyledRequestVoucherInfo>
  );
}

export default RequestVoucherInfo;
