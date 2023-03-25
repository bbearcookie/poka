import React, { useCallback } from 'react';
import PhotocardItem from '@component/photocard/new/item/PhotocardItem';
import StateLabel from '@component/label/stateLabel/StateLabel';
import { VoucherItem as VoucherItemType, VoucherState } from '@type/voucher';
import { IconType } from '@type/icon';
import { StylesVoucherItem } from './_styles';

interface Props
  extends Pick<
    VoucherItemType,
    'voucherId' | 'photo' | 'owner' | 'createdTime'
  > {
  voucherState: VoucherState;
  showOwner?: boolean;
  icon?: IconType;
  onClick?: (voucherId: number) => void;
}

function VoucherItem({
  voucherId,
  photo,
  owner,
  createdTime,
  voucherState,
  showOwner = true,
  icon,
  onClick = () => {},
}: Props) {
  const handleClick = useCallback(() => {
    onClick(voucherId);
  }, [voucherId, onClick]);

  return (
    <PhotocardItem {...photo} icon={icon} onClick={handleClick}>
      <StylesVoucherItem>
        <StateLabel
          state={{ type: 'voucher', key: voucherState }}
          styles={{ textAlign: 'start', width: 'fit-content', margin: '0' }}
        />
        {showOwner && (
          <span className="owner-name">
            <b>{owner.username}</b>
          </span>
        )}
      </StylesVoucherItem>
    </PhotocardItem>
  );
}

export default VoucherItem;
