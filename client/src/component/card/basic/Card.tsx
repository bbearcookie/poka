import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

interface Props {
  className?: string;
  styles?: StylesProps;
  children?: React.ReactNode;
}
const DefaultProps = {};

function Card({ className, styles, children }: Props) {
  return (
    <StyledCard className={classNames("Card", className)} {...styles}>
      {children}
    </StyledCard>
  );
}

export default Card;

// 스타일 컴포넌트
export interface StylesProps {
  display?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  padding?: string;
  textAlign?: string;
  backgroundColor?: string;
  boxShadow?: string;
  border?: string;
}
const StyledCard = styled.article<StylesProps>`
  display: ${p => p.display};
  width: ${p => p.width};
  min-width: ${p => p.minWidth};
  max-width: ${p => p.maxWidth};
  height: ${p => p.height};
  min-height: ${p => p.minHeight};
  max-height: ${p => p.maxHeight};
  margin: ${p => p.margin};
  margin-top: ${p => p.marginTop};
  margin-bottom: ${p => p.marginBottom};
  margin-left: ${p => p.marginLeft};
  margin-right: ${p => p.marginRight};
  padding: ${p => p.padding};
  background-color: ${p => p.backgroundColor ? p.backgroundColor : 'white'};
  box-shadow: ${p => p.boxShadow};
  text-align: ${p => p.textAlign};
  border: ${p => p.border ? p.border : '1px solid #E5E7EB'};
  border-radius: 10px;

  .text { margin: 0; }
  .description { margin: 0.2em 0; color: #65748B; }
`