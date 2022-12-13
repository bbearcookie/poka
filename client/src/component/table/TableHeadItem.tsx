import React from 'react';
import styled from 'styled-components';

interface Props {
  styles?: StylesProps;
  children?: React.ReactNode;
}
const DefaultProps = {};

function TableHeadItem({ styles, children }: Props) {
  return (
    <StyledTH {...styles}>
      {children}
    </StyledTH>
  );
}

export default TableHeadItem;

// 스타일 컴포넌트
interface StylesProps {
  width?: string;
  padding?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  textAlign?: string;
}
const StyledTH = styled.th<StylesProps>`
  width: ${p => p.width};
  padding: ${p => p.padding};
  padding-top: ${p => p.paddingTop};
  padding-bottom: ${p => p.paddingBottom};
  padding-left: ${p => p.paddingLeft};
  padding-right: ${p => p.paddingRight};
  text-align: ${p => p.textAlign};
`;