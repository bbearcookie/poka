import React from 'react';
import styled from 'styled-components';

interface CardBodyProps {
  padding?: string;
  children?: React.ReactNode;
}

const CardBodyDefaultProps = {
  padding: '1.5em'
};

export function CardBody(p: CardBodyProps & typeof CardBodyDefaultProps) {
  return (
    <StyledCardBody className="CardBody" {...p}>
      {p.children}
    </StyledCardBody>
  );
}
CardBody.defaultProps = CardBodyDefaultProps;

const StyledCardBody = styled.section<CardBodyProps>`
  padding: ${p => p.padding};
`

export default CardBody;