import React from 'react';
import styled from 'styled-components';

interface CardHeaderProps {
  borderBottom?: string;
  padding?: string;
  children?: React.ReactNode;
}

const CardHeaderDefaultProps = {
  borderBottom: '1px solid #E5E7EB',
  padding: '1.5em'
};

export function CardHeader(p: CardHeaderProps & typeof CardHeaderDefaultProps) {
  return (
    <StyledCardHeader className="CardHeader" {...p}>
      {p.children}
    </StyledCardHeader>
  );
}
CardHeader.defaultProps = CardHeaderDefaultProps;
export default CardHeader;

// 스타일 컴포넌트
const StyledCardHeader = styled.header<CardHeaderProps>`
  padding: ${p => p.padding};
  border-bottom: ${p => p.borderBottom};
`;
