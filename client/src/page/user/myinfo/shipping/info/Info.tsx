import React from 'react';
import Address from '@component/shipping/address/item/Address';
import { IconSection } from '@component/shipping/address/item/_styles';
import { Address as AddressType } from '@type/shipping';
import Prime from './content/Prime';
import Edit from './content/Edit';
import Remove from './content/Remove';

interface Props {
  address: AddressType
  startEditor: () => void;
}

function Info(props: Props) {
  const { address, startEditor } = props;

  return (
    <Address {...address}>
      <IconSection>
        <Prime addressId={address.addressId} />
        <Edit startEditor={startEditor} />
        <Remove {...address} />
      </IconSection>
    </Address>
  );
}

export default Info;
