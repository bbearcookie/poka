import React from 'react';
import styled from 'styled-components';

interface TableHeadProps {
  height?: string;
  children?: React.ReactNode;
}

const TableHeadDefaultProps = {};

function TableHead(p: TableHeadProps & typeof TableHeadDefaultProps) {
  return (
    <StyledTableHead {...p}>
      {p.children}
    </StyledTableHead>
  );
}

TableHead.defaultProps = TableHeadDefaultProps;
export default TableHead;

const StyledTableHead = styled.thead<TableHeadProps>`
  height: ${p => p.height};
  background-color: #F3F4F6;
  color: #374151;
  text-align: left;
`;