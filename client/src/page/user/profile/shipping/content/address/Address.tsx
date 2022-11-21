import React from 'react';
import CardHeader from '@component/card/basic/CardHeader';
import IconButton from '@component/form/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faInfoCircle, faEdit, faUser, faHouse } from '@fortawesome/free-solid-svg-icons';
import { AddressType } from '@api/shippingAddressAPI';
import AddressRemove from '../AddressRemove';

interface AddressProps {
  address: AddressType;
  startEditor: () => void;
  children?: React.ReactNode;
}
const AddressDefaultProps = {};

function Address({ address, startEditor, children }: AddressProps & typeof AddressDefaultProps) {
  return (
    <CardHeader className="recipient-section">
      <h4 className="name">{address.name}</h4>
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
        <IconButton width="1em" height="1em" icon={faHouse} tooltip="기본 배송지로 설정" styles={{ display: 'inline' }} />
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

Address.defaultProps = AddressDefaultProps;
export default Address;