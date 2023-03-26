import styled from 'styled-components';

interface ItemSectionProps {
  margin?: string;
  marginBottom?: string;
  templateColumnsSize: string;
}

export const ItemSection = styled.section<ItemSectionProps>`
  margin: ${p => p.margin};
  margin-bottom: ${p => p.marginBottom};
  display: grid;
  grid-template-columns: repeat(auto-fill, ${p => p.templateColumnsSize});
  gap: 2em;

  &:empty {
    display: none;
  }

  @media screen and (max-width: 50rem) {
    justify-items: center;
  }
`;
