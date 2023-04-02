import React from 'react';
import { Address as AddressType } from '@type/shipping';
import IconButton from '@component/form/IconButton';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Address from '@component/shipping/address/item/Address';
import { IconSection } from '@component/shipping/address/item/_styles';
import AddressPrime from './content/AddressPrime';
import AddressRemove from './content/AddressRemove';

interface Props {
  address: AddressType;
  startEditor?: () => void;
}

function Index({ address, startEditor }: Props) {
  return (
    <Address {...address}>
      <IconSection>
        {!address.prime && <AddressPrime address={address} />}
        <IconButton
          width="1em"
          height="1em"
          icon={faEdit}
          tooltip="수정"
          styles={{ display: 'inline' }}
          onClick={startEditor}
        />
        <AddressRemove address={address} />
      </IconSection>
    </Address>
  );
}

export default Index;