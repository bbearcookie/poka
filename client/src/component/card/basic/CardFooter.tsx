import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components'

interface CardFooterProps {
  className?: string;
  padding?: string;
  styles?: StylesProps;
  children?: React.ReactNode;
}

const CardFooterDefaultProps = {};

function CardFooter({ className, styles, children }: CardFooterProps & typeof CardFooterDefaultProps) {
  return (
    <StyledCardFooter className={classNames("CardFooter", className)} {...styles}>
      {children}
    </StyledCardFooter>
  );
}

CardFooter.defaultProps = CardFooterDefaultProps;
export default CardFooter;

// 스타일 컴포넌트
export interface StylesProps {
  padding?: string;
}
const StyledCardFooter = styled.footer<StylesProps>`
  padding: ${p => p.padding ? p.padding : '1.5em'};
  border-top: 1px solid #E5E7EB;
`