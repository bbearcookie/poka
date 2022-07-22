import React from 'react';
import styled from 'styled-components';

interface TableBodyProps {
  height?: string;
  children?: React.ReactNode;
}

const TableBodyDefaultProps = {};

function TableBody(p: TableBodyProps & typeof TableBodyDefaultProps) {
  return (
    <StyledTableBody {...p}>
      {p.children}
    </StyledTableBody>
  );
}

TableBody.defaultProps = TableBodyDefaultProps;
export default TableBody;

const StyledTableBody = styled.tbody<TableBodyProps>`
  background-color: white;

  th, td {
    height: ${p => p.height};
  }
`;