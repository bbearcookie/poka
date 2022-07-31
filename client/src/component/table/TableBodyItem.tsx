import React from 'react';
import styled from 'styled-components';

interface TableBodyItemProps {
  styles?: StylesProps;
  children?: React.ReactNode;
}
const TableBodyItemDefaultProps = {};
function TableBodyItem(p: TableBodyItemProps & typeof TableBodyItemDefaultProps) {
  return (
    <StyledTD {...StylesDefaultProps} {...p.styles} {...p}>
      {p.children}
    </StyledTD>
  );
}

TableBodyItem.defaultProps = TableBodyItemDefaultProps;
export default TableBodyItem;

// 스타일 컴포넌트
interface StylesProps {
  padding?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
}
const StylesDefaultProps = {};
const StyledTD = styled.td<StylesProps & typeof StylesDefaultProps>`
  padding: ${p => p.padding};
  padding-top: ${p => p.paddingTop};
  padding-bottom: ${p => p.paddingBottom};
  padding-left: ${p => p.paddingLeft};
  padding-right: ${p => p.paddingRight};
`;