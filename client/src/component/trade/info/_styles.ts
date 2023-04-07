import styled from 'styled-components';
import CardListItem from '@component/card/basic/CardListItem';
import { Card } from '@component/card/basic/_styles';

export const StyledTradeInfo = styled(Card)`
  .wantcard-label {
    margin: 0 0 1.5em 0;
  }

  ${CardListItem} {
    color: #65748b;
  }
`;
