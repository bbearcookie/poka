import styled from 'styled-components';
import { contentsPadding } from '@util/_commonStyles';

export const StyledIndex = styled.main`
  ${contentsPadding}

  .username-section, voucher-section {
    margin-bottom: 2em;
  }

  .button-section {
    margin-top: 5em;
    display: flex;
    justify-content: right;
  }
`;
