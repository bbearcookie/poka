import React from 'react';
import styled from 'styled-components';

interface Props {
  styles?: StylesProps;
  children?: React.ReactNode;
}
const DefaultProps = {};
function TableHead({ styles, children }: Props) {
  return (
    <StyledTableHead {...styles}>
      {children}
    </StyledTableHead>
  );
}

export default TableHead;
interface StylesProps {
  height?: string;
}
const StyledTableHead = styled.thead<StylesProps>`
  height: ${p => p.height};
  background-color: #F3F4F6;
  color: #374151;
  text-align: left;
`;