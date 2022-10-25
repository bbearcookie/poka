import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

interface CardBodyProps {
  className?: string;
  padding?: string;
  width?: string;
  height?: string;
  children?: React.ReactNode;
}

const CardBodyDefaultProps = {
  padding: '1.5em'
};

export function CardBody(p: CardBodyProps & typeof CardBodyDefaultProps) {
  return (
    <StyledCardBody className={classNames("CardBody", p.className)} {...p}>
      {p.children}
    </StyledCardBody>
  );
}
CardBody.defaultProps = CardBodyDefaultProps;
export default CardBody;

// 스타일 컴포넌트
const StyledCardBody = styled.section<CardBodyProps>`
  width: ${p => p.width};
  height: ${p => p.height};
  padding: ${p => p.padding};
`
