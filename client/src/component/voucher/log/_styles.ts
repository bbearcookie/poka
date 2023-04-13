import styled from 'styled-components';
import CardListItem from '@component/card/basic/CardListItem';

export const StyledLog = styled.ul`
  list-style: none;
  padding: 1em 0;
  border-bottom: 1px solid #e5e7eb;

  ${CardListItem} {
    padding: 1em 1.5em;
    border-bottom: none;
  }
`;