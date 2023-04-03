import styled from "styled-components";
import { contentsPadding } from "@util/_commonStyles";
import { StyledAddress } from "@component/shipping/address/item/_styles";
import { RequestVoucherInfo, ShippingRequestInfo } from "@component/shipping/request/_styles";

export const StyledIndex = styled.main`
  ${contentsPadding}

  ${StyledAddress} {
    padding: 0;
    border-bottom: none;
  }

  ${RequestVoucherInfo}, ${ShippingRequestInfo} {
    margin-bottom: 5em;
  }
`