import React from 'react';
import { ShippingAddressType } from '@type/user';
import IconButton from '@component/form/IconButton';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Address, { IconSection } from '@component/address/Address';
import AddressPrime from './content/AddressPrime';
import AddressRemove from './content/AddressRemove';

interface Props {
  address: ShippingAddressType;
  startEditor?: () => void;
}
const DefaultProps = {};

function Index({ address, startEditor }: Props) {
  return (
    <Address address={address}>
      <IconSection>
        {address.prime === "false" && <AddressPrime address={address} />}
        <IconButton
          width="1em"
          height="1em"
          icon={faEdit}
          tooltip="수정"
          styles={{ display: "inline" }}
          onClick={startEditor}
        />
        <AddressRemove address={address} />
      </IconSection>
    </Address>
  );
}

export default Index;