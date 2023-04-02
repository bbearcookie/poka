import React from 'react';
import Address from '@component/shipping/address/item/Address';
import { IconSection } from '@component/shipping/address/item/_styles';
import { Address as AddressType } from '@type/shipping';
import Prime from './Prime';
import Edit from './Edit';
import Remove from './Remove';

interface Props extends AddressType {
  startEditor: () => void;
}

function AddressInfo(props: Props) {
  const { addressId, startEditor } = props;

  return (
    <Address {...props}>
      <IconSection>
        <Prime addressId={addressId} />
        <Edit startEditor={startEditor} />
        <Remove {...props} />
      </IconSection>
    </Address>
  );
}

export default AddressInfo;
