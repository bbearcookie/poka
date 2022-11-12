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
    <StyledCardHeader
      className={classNames("CardHeader", className)}
      {...StylesDefaultProps} {...styles}
    >
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
const StylesDefaultProps = {
  padding: '1.5em',
  borderBottom: '1px solid #E5E7EB'
}
const StyledCardHeader = styled.header<StylesProps & typeof StylesDefaultProps>`
  padding: ${p => p.padding};
  border-bottom: ${p => p.borderBottom};
`;
