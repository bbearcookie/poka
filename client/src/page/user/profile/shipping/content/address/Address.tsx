import React from 'react';
import CardHeader from '@component/card/basic/CardHeader';
import IconButton from '@component/form/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faInfoCircle, faEdit, faUser, faHouse } from '@fortawesome/free-solid-svg-icons';
import { AddressType } from '@api/shippingAddressAPI';
import AddressRemove from './content/AddressRemove';
import AddressPrime from './content/AddressPrime';

interface Props {
  address: AddressType;
  startEditor: () => void;
}
const DefaultProps = {};

function Address({ address, startEditor }: Props) {
  return (
    <CardHeader className="recipient-section">
      <div className="name-section content-section">
        <span className="name">{address.name}</span>
        {address.prime === 'true' && <span className="prime-label">기본배송지</span>}
      </div>
      <div className="content-section">
        <FontAwesomeIcon icon={faLocationDot} width="1.5em" height="1.5em" color="#2678F3" />
        <span className="text">{address.address} {address.address_detail}</span>
      </div>
      <div className="content-section">
        <FontAwesomeIcon icon={faUser} width="1.5em" height="1.5em" color="#EC1B5A" />
        <span className="text">{address.recipient}</span>
      </div>
      <div className="content-section">
        <FontAwesomeIcon icon={faPhone} width="1.5em" height="1.5em" color="#459A10" />
        <span className="text">{address.contact}</span>
      </div>
      {address.requirement &&
      <div className="content-section">
        <FontAwesomeIcon icon={faInfoCircle} width="1.5em" height="1.5em" color="#F3E079" />
        <span className="text">{address.requirement}</span>
      </div>}
      <div className="icon-section">
        {address.prime === 'false' && <AddressPrime address={address} />}
        <IconButton
          width="1em"
          height="1em"
          icon={faEdit}
          tooltip="수정"
          styles={{ display: 'inline' }}
          onClick={startEditor}
        />
        <AddressRemove address={address} />
      </div>
    </CardHeader>
  );
}

export default Address;