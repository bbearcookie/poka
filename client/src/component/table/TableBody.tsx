import React from 'react';
import styled from 'styled-components';

interface TableBodyProps {
  styles?: StylesProps;
  children?: React.ReactNode;
}
const TableBodyDefaultProps = {};
function TableBody(p: TableBodyProps & typeof TableBodyDefaultProps) {
  return (
    <StyledTableBody {...StylesDefaultProps} {...p.styles} {...p}>
      {p.children}
    </StyledTableBody>
  );
}

TableBody.defaultProps = TableBodyDefaultProps;
export default TableBody;

// 스타일 컴포넌트
interface StylesProps {
  height?: string;
}
const StylesDefaultProps = {};
const StyledTableBody = styled.tbody<StylesProps & typeof StylesDefaultProps>`
  background-color: white;

  th, td {
    height: ${p => p.height};
  }
`;