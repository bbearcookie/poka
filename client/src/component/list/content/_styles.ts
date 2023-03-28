import styled from 'styled-components';

interface ItemSectionProps {
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  templateColumnsSize: string;
}

export const ItemSection = styled.section<ItemSectionProps>`
  margin: ${p => p.margin};
  margin-top: ${p => p.marginTop};
  margin-bottom: ${p => p.marginBottom};
  margin-left: ${p => p.marginLeft};
  margin-right: ${p => p.marginRight};
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
