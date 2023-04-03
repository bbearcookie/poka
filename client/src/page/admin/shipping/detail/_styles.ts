import styled from 'styled-components';
import { contentsPadding } from '@util/_commonStyles';
import { RequestVoucherInfo, ShippingRequestInfo } from '@component/shipping/request/_styles';

export const StyledIndex = styled.main`
  ${contentsPadding}

  ${RequestVoucherInfo}, ${ShippingRequestInfo} {
    margin-bottom: 5em;
  }
`;
