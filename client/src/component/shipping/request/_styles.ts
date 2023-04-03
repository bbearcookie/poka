import styled from 'styled-components';
import { Card } from '@component/card/basic/_styles';
import { StyledAddress } from '../address/item/_styles';

export const RequestVoucherInfo = styled(Card)``;
export const ShippingRequestInfo = styled(Card)`
  ${StyledAddress} {
    padding: 0;
    border-bottom: none;
  }
`;
