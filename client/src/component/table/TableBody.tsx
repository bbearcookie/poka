import React from 'react';
import styled from 'styled-components';

interface Props {
  styles?: StylesProps;
  children?: React.ReactNode;
}
const DefaultProps = {};
function TableBody({ styles, children }: Props) {
  return (
    <StyledTableBody {...styles}>
      {children}
    </StyledTableBody>
  );
}

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