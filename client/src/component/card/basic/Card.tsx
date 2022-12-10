import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

interface CardProps {
  className?: string;
  styles?: StylesProps;
  children?: React.ReactNode;
}
const CardDefaultProps = {};

function Card({ className, styles, children }: CardProps & typeof CardDefaultProps) {
  return (
    <StyledCard className={classNames("Card", className)} {...styles}>
      {children}
    </StyledCard>
  );
}

Card.defaultProps = CardDefaultProps;
export default Card;

// 스타일 컴포넌트
export interface StylesProps {
  display?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  textAlign?: string;
  backgroundColor?: string;
  boxShadow?: string;
}
const StyledCard = styled.article<StylesProps>`
  display: ${p => p.display};
  width: ${p => p.width};
  min-width: ${p => p.minWidth};
  max-width: ${p => p.maxWidth};
  margin: ${p => p.margin};
  margin-top: ${p => p.marginTop};
  margin-bottom: ${p => p.marginBottom};
  margin-left: ${p => p.marginLeft};
  margin-right: ${p => p.marginRight};
  background-color: ${p => p.backgroundColor ? p.backgroundColor : 'white'};
  box-shadow: ${p => p.boxShadow};
  text-align: ${p => p.textAlign};
  border: 1px solid #E5E7EB;
  border-radius: 10px;

  .text { margin: 0; }
  .description { margin: 0; color: #65748B; }
`