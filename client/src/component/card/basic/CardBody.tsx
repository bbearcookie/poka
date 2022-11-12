import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

interface CardBodyProps {
  className?: string;
  styles?: StylesProps;
  children?: React.ReactNode;
}

const CardBodyDefaultProps = {};

export function CardBody({ className, styles, children }: CardBodyProps & typeof CardBodyDefaultProps) {
  return (
    <StyledCardBody
      className={classNames("CardBody", className)}
      {...StylesDefaultProps}
      {...styles}
    >
      {children}
    </StyledCardBody>
  );
}
CardBody.defaultProps = CardBodyDefaultProps;
export default CardBody;

// 스타일 컴포넌트
export interface StylesProps {
  padding?: string;
  width?: string;
  height?: string;
}
const StylesDefaultProps = {
  padding: '1.5em'
}
const StyledCardBody = styled.section<StylesProps & typeof StylesDefaultProps>`
  padding: ${p => p.padding};
  width: ${p => p.width};
  height: ${p => p.height};
`
