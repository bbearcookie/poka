import React from 'react';
import styled from 'styled-components';

interface TableBodyItemProps {
  padding?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  children?: React.ReactNode;
}

const TableBodyItemDefaultProps = {};

function TableBodyItem(p: TableBodyItemProps & typeof TableBodyItemDefaultProps) {
  return (
    <StyledTD {...p}>
      {p.children}
    </StyledTD>
  );
}

TableBodyItem.defaultProps = TableBodyItemDefaultProps;
export default TableBodyItem;

// 스타일 컴포넌트
const StyledTD = styled.td<TableBodyItemProps>`
  padding: ${p => p.padding};
  padding-top: ${p => p.paddingTop};
  padding-bottom: ${p => p.paddingBottom};
  padding-left: ${p => p.paddingLeft};
  padding-right: ${p => p.paddingRight};
`;