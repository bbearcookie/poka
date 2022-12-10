import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

interface CardHeaderProps {
  className?: string;
  styles?: StylesProps;
  children?: React.ReactNode;
}

const CardHeaderDefaultProps = {};

export function CardHeader({ className, styles, children }: CardHeaderProps & typeof CardHeaderDefaultProps) {
  return (
    <StyledCardHeader className={classNames("CardHeader", className)} {...styles}>
      {children}
    </StyledCardHeader>
  );
}
CardHeader.defaultProps = CardHeaderDefaultProps;
export default CardHeader;

// 스타일 컴포넌트
export interface StylesProps {
  padding?: string;
  borderBottom?: string;
}
const StyledCardHeader = styled.header<StylesProps>`
  padding: ${p => p.padding ? p.padding : '1.5em'};
  border-bottom: ${p => p.borderBottom ? p.borderBottom : '1px solid #E5E7EB'};
`;
