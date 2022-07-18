import React from 'react';
import styled from 'styled-components'

interface CardFooterProps {
  padding?: string;
  children?: React.ReactNode;
}

const CardFooterDefaultProps = {
  padding: '1.5em'
};

function CardFooter(p: CardFooterProps & typeof CardFooterDefaultProps) {
  return (
    <StyledCardFooter className="CardFooter" {...p}>
      {p.children}
    </StyledCardFooter>
  );
}

CardFooter.defaultProps = CardFooterDefaultProps;
export default CardFooter;

// 스타일 컴포넌트
const StyledCardFooter = styled.footer<CardFooterProps>`
  padding: ${p => p.padding};
  border-top: 1px solid #E5E7EB;
`