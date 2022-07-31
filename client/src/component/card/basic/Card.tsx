import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

interface CardProps {
  className?: string;
  display?: string;
  minWidth?: string;
  maxWidth?: string;
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  backgroundColor?: string;
  boxShadow?: string;
  children?: React.ReactNode;
}

const CardDefaultProps = {
  backgroundColor: 'white'
};

function Card(p: CardProps & typeof CardDefaultProps) {
  return (
    <StyledCard {...p} className={classNames("Card", p.className)}>
      {p.children}
    </StyledCard>
  );
}

Card.defaultProps = CardDefaultProps;
export default Card;

// 스타일 컴포넌트
const StyledCard = styled.article<CardProps>`
  display: ${p => p.display};
  min-width: ${p => p.minWidth};
  max-width: ${p => p.maxWidth};
  margin: ${p => p.margin};
  margin-top: ${p => p.marginTop};
  margin-bottom: ${p => p.marginBottom};
  margin-left: ${p => p.marginLeft};
  margin-right: ${p => p.marginRight};
  background-color: ${p => p.backgroundColor};
  box-shadow: ${p => p.boxShadow};
  border: 1px solid #E5E7EB;
  border-radius: 10px;

  .text { margin: 0; }
  .description { margin: 0; color: #65748B; }
`