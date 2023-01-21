import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

interface Props {
  className?: string;
  styles?: StylesProps;
  children?: React.ReactNode;
}
const DefaultProps = {};

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
  width?: string;
  height?: string;
  color?: string;
}
const StyledCardBody = styled.section<StylesProps>`
  padding: ${p => p.padding ? p.padding : '1.5em'};
  width: ${p => p.width};
  height: ${p => p.height};
  color: ${p => p.color};
`
