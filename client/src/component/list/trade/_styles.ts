import styled from 'styled-components';

export const StyledTradeList = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(15em, 1fr));
  gap: 3em;

  @media screen and (max-width: 90rem) {
    grid-template-columns: repeat(2, minmax(15em, 1fr));
  }

  @media screen and (max-width: 40rem) {
    grid-template-columns: 1fr;
  }
`;
