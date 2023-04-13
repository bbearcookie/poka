import React from 'react';
import styled from 'styled-components';

interface Props {
  title?: string | React.ReactNode;
  children?: React.ReactNode;
}

function CardListItem({ title, children, ...rest }: Props) {
  return (
    <li {...rest}>
      <Title>{title}</Title>
      <div>{children}</div>
    </li>
  );
}

export default styled(CardListItem)`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  padding: 1.5em;

  @media screen and (max-width: 65rem) {
    flex-direction: column;
    gap: 0.5em;
  }
`;

const Title = styled.div`
  flex-basis: 30%;
  color: #121828;
`;
