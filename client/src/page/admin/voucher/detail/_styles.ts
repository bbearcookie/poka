import styled from 'styled-components';
import { contentsPadding } from '@util/_commonStyles';
import { VoucherInfo } from '@component/voucher/info/_styles';

export const StyledIndex = styled.main`
  ${contentsPadding}

  ${VoucherInfo} {
    margin-bottom: 5em;
  }
`;
