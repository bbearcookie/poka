import styled from 'styled-components';
import { contentsPadding } from '@util/_commonStyles';
import { StyledTradeInfo } from '@component/trade/info/_styles';

export const StyledIndex = styled.main`
  ${contentsPadding};

  ${StyledTradeInfo} {
    margin-bottom: 5em;
  }
`;
