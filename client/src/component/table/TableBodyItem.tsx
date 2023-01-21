import React from 'react';
import styled from 'styled-components';

interface Props {
  styles?: StylesProps;
  children?: React.ReactNode;
}
const DefaultProps = {};
function TableBodyItem({ styles, children }: Props) {
  return (
    <StyledTD {...styles}>
      {children}
    </StyledTD>
  );
}

export default TableBodyItem;

// 스타일 컴포넌트
interface StylesProps {
  padding?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
}
const StyledTD = styled.td<StylesProps>`
  padding: ${p => p.padding};
  padding-top: ${p => p.paddingTop};
  padding-bottom: ${p => p.paddingBottom};
  padding-left: ${p => p.paddingLeft};
  padding-right: ${p => p.paddingRight};
`;