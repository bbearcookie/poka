import React from 'react';
import PhotocardItem from '@component/photocard/item/PhotocardItem';
import StateLabel from '@component/label/stateLabel/StateLabel';
import { VoucherItem as VoucherItemType, VoucherState } from '@type/voucher';
import { IconType } from '@type/icon';
import { StylesVoucherItem } from './_styles';

interface Props extends Pick<VoucherItemType, 'voucherId' | 'photo' | 'owner' | 'createdTime'> {
  voucherState: VoucherState;
  showOwner?: boolean;
  icon?: IconType;
  handleClick?: (voucherId: number) => void;
  item?: React.ReactNode;
}

function VoucherItem({
  voucherId,
  photo,
  owner,
  createdTime,
  voucherState,
  showOwner = true,
  icon,
  item,
  handleClick = () => {},
}: Props) {
  return (
    <PhotocardItem {...photo} icon={icon} handleClick={() => handleClick(voucherId)}>
      <StylesVoucherItem>
        <section className="info-section">
          <StateLabel
            state={{ type: 'voucher', key: voucherState }}
            css={{ textAlign: 'start', width: 'fit-content', margin: '0' }}
          />
          {showOwner && (
            <span className="owner-name">
              <b>{owner.username}</b>
            </span>
          )}
        </section>

        <section className="item-section">{item}</section>
      </StylesVoucherItem>
    </PhotocardItem>
  );
}

export default VoucherItem;
