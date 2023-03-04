import styled from 'styled-components';

interface ItemSectionProps {
  gridGap?: string;
  margin?: string;
  marginBottom?: string;
}

export const ItemSection = styled.section<ItemSectionProps>`
  margin: ${p => p.margin};
  margin-bottom: ${p => p.marginBottom};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, max-content));
  grid-gap: ${p => p.gridGap ? p.gridGap : '2em'};

  @media screen and (max-width: 80rem) {
    justify-content: center;
  }
`