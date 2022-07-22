import React from 'react';
import styled from 'styled-components';

interface TableHeadItemProps {
  width?: string;
  padding?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  textAlign?: string;
  children?: React.ReactNode;
}

const TableHeadItemDefaultProps = {};

function TableHeadItem(p: TableHeadItemProps & typeof TableHeadItemDefaultProps) {
  return (
    <StyledTH {...p}>
      {p.children}
    </StyledTH>
  );
}

TableHeadItem.defaultProps = TableHeadItemDefaultProps;
export default TableHeadItem;

// 스타일 컴포넌트
const StyledTH = styled.th<TableHeadItemProps>`
  width: ${p => p.width};
  padding: ${p => p.padding};
  padding-top: ${p => p.paddingTop};
  padding-bottom: ${p => p.paddingBottom};
  padding-left: ${p => p.paddingLeft};
  padding-right: ${p => p.paddingRight};
  text-align: ${p => p.textAlign};
`;