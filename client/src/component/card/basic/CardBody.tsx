import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

interface Props {
  className?: string;
  styles?: StylesProps;
  children?: React.ReactNode;
}

export function CardBody({ className, styles, children }: Props) {
  return (
    <StyledCardBody className={classNames("CardBody", className)} {...styles}>
      {children}
    </StyledCardBody>
  );
}

export default CardBody;

// 스타일 컴포넌트
export interface StylesProps {
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
  minHeight?: string;
  color?: string;
}
const StyledCardBody = styled.main<StylesProps>`
  padding: ${p => p.padding ? p.padding : '1.5em'};
  margin: ${p => p.margin};
  width: ${p => p.width};
  height: ${p => p.height};
  min-height: ${p => p.minHeight};
  color: ${p => p.color};

  .title { margin: 0 0 1em 0; }
`
