import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faInfoCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { StyledAddress } from './_styles';
import { CSSProp } from 'styled-components';

interface Props {
  name?: string;
  address?: string;
  addressDetail?: string;
  recipient?: string;
  contact?: string;
  requirement?: string;
  prime?: number;
  cssProp?: CSSProp;
  children?: React.ReactNode;
}

function Address({
  name,
  address,
  addressDetail,
  contact,
  recipient,
  requirement,
  prime = 0,
  cssProp,
  children,
}: Props) {
  return (
    <StyledAddress css={cssProp}>
      {name && (
        <div className="content-section name-section">
          <span className="name">
            <b>{name}</b>
          </span>
          {prime === 1 && <span className="prime">기본배송지</span>}
        </div>
      )}
      <div className="content-section">
        <FontAwesomeIcon icon={faLocationDot} width="1.5em" height="1.5em" color="#2678F3" />
        <span className="text">
          {address} {addressDetail}
        </span>
      </div>
      {recipient && (
        <div className="content-section">
          <FontAwesomeIcon icon={faUser} width="1.5em" height="1.5em" color="#EC1B5A" />
          <span className="text">{recipient}</span>
        </div>
      )}
      <div className="content-section">
        <FontAwesomeIcon icon={faPhone} width="1.5em" height="1.5em" color="#459A10" />
        <span className="text">{contact}</span>
      </div>
      {requirement && (
        <div className="content-section">
          <FontAwesomeIcon icon={faInfoCircle} width="1.5em" height="1.5em" color="#F3E079" />
          <span className="text">{requirement}</span>
        </div>
      )}
      {children}
    </StyledAddress>
  );
}

export default Address;