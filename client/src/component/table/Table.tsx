import React from 'react';
import TableWrapper from './styles/_TableWrapper';
import StyledTable, { Props as StylesProps } from './styles/_StyledTable';

interface Props {
  styles?: StylesProps;
  children?: React.ReactNode;
}

function Table({ styles, children }: Props) {
  return (
    <TableWrapper>
      <StyledTable {...styles}>
        {children}
      </StyledTable>
    </TableWrapper>
  );
}

export default Table;