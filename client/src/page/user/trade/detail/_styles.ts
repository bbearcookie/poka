import styled from 'styled-components';
import { contentsPadding } from '@util/_commonStyles';
import { StyledTradeInfo } from '@component/trade/info/_styles';
import { RemoveCard } from '@component/card/_styles';

export const StyledIndex = styled.main`
  ${contentsPadding};

  ${StyledTradeInfo}, ${RemoveCard} {
    margin-bottom: 5em;
  }
`;
