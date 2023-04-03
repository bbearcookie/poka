import styled from 'styled-components';
import { Card, CardListItem } from '@component/card/basic/_styles';

export const HistorySection = styled.div`
  ${CardListItem} {
    border-bottom: none;
  }
`;

export const StyledDateSelector = styled(Card)`
  margin-bottom: 5em;
`;
