import React from 'react';
import styled from 'styled-components';

interface CardBodyProps {
  padding?: string;
  height?: string;  
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
export default CardBody;

// 스타일 컴포넌트
const StyledCardBody = styled.section<CardBodyProps>`
  height: ${p => p.height};
  padding: ${p => p.padding};
`
