import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faInfoCircle, faEdit, faUser } from '@fortawesome/free-solid-svg-icons';
import { ShippingAddressType } from '@type/user';

interface Props {
  address: ShippingAddressType;
  children?: React.ReactNode;
}
const DefaultProps = {};

function Address({ address, children }: Props) {
  return (
    <StyledWrapper>
      <ContentSection className="name-section">
        <NameLabel>{address.name}</NameLabel>
        {address.prime === 'true' && <PrimeLabel>기본배송지</PrimeLabel>}
      </ContentSection>
      <ContentSection>
        <FontAwesomeIcon icon={faLocationDot} width="1.5em" height="1.5em" color="#2678F3" />
        <span className="text">{address.address} {address.addressDetail}</span>
      </ContentSection>
      <ContentSection>
        <FontAwesomeIcon icon={faUser} width="1.5em" height="1.5em" color="#EC1B5A" />
        <span className="text">{address.recipient}</span>
      </ContentSection>
      <ContentSection>
        <FontAwesomeIcon icon={faPhone} width="1.5em" height="1.5em" color="#459A10" />
        <span className="text">{address.contact}</span>
      </ContentSection>
      {address.requirement &&
      <ContentSection>
        <FontAwesomeIcon icon={faInfoCircle} width="1.5em" height="1.5em" color="#F3E079" />
        <span className="text">{address.requirement}</span>
      </ContentSection>}
      {children}
    </StyledWrapper>
  );
}

export default Address;

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 1.5em;
  border-bottom: 1px solid #E5E7EB;
`

export const ContentSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5em;

  &.name-section { margin-bottom: 0.7em; }
  .text { margin: 0 0 0.5em 0; }
`

export const IconSection = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const NameLabel = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`

const PrimeLabel = styled.span`
  font-size: 0.7rem;
  color: #A39D9D;
  border: 1px solid #A39D9D;
  border-radius: 20px;
  padding: 0.3em;
  user-select: none;
`