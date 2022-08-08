import React from 'react';
import styled from 'styled-components';

interface TableHeadProps {
  styles?: StylesProps;
  children?: React.ReactNode;
}
const TableHeadDefaultProps = {};
function TableHead(p: TableHeadProps & typeof TableHeadDefaultProps) {
  return (
    <StyledTableHead {...StylesDefaultProps} {...p.styles} {...p}>
      {p.children}
    </StyledTableHead>
  );
}

TableHead.defaultProps = TableHeadDefaultProps;
export default TableHead;
interface StylesProps {
  height?: string;
}
const StylesDefaultProps = {};
const StyledTableHead = styled.thead<StylesProps & typeof StylesDefaultProps>`
  height: ${p => p.height};
  background-color: #F3F4F6;
  color: #374151;
  text-align: left;
`;