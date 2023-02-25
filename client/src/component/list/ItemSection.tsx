import React from 'react';
import styled from 'styled-components';

interface Props {
  styles?: StylesProps;
  children?: React.ReactNode;
}

function ItemSection({ styles, children }: Props) {
  return (
    <StyledItemSection className="ItemSection" {...styles}>
      {children}
    </StyledItemSection>
  );
}

export default ItemSection;

interface StylesProps {
  gridGap?: string;
  margin?: string;
  marginBottom?: string;
}
const StyledItemSection = styled.section<StylesProps>`
  margin: ${p => p.margin};
  margin-bottom: ${p => p.marginBottom};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, max-content));
  grid-gap: ${p => p.gridGap ? p.gridGap : '2em'};

  @media screen and (max-width: 80rem) {
    justify-content: center;
  }
`