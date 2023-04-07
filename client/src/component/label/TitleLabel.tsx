import React from 'react';
import styled from 'styled-components';

interface Props {
  title?: string;
  children?: React.ReactNode;
}

function TitleLabel({ title, children, ...rest }: Props) {
  return (
    <div {...rest}>
      <Title>{title}</Title>
      {children}
    </div>
  );
}

export default styled(TitleLabel)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1em;
`;

const Title = styled.h1`
  flex-grow: 1;
  margin: 0;
`;
