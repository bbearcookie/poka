import React from 'react';
import styled from 'styled-components';

interface TableBodyProps {
  styles?: StylesProps;
  children?: React.ReactNode;
}
const TableBodyDefaultProps = {};
function TableBody({ styles, children }: TableBodyProps & typeof TableBodyDefaultProps) {
  return (
    <StyledTableBody {...styles}>
      {children}
    </StyledTableBody>
  );
}

TableBody.defaultProps = TableBodyDefaultProps;
export default TableBody;

// 스타일 컴포넌트
interface StylesProps {
  height?: string;
}
const StyledTableBody = styled.tbody<StylesProps>`
  background-color: white;

  th, td {
    height: ${p => p.height};
  }
`;