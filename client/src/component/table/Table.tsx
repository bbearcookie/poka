import React from 'react';
import styled from 'styled-components';

interface TableProps {
  styles?: StylesProps;
  children?: React.ReactNode;
}
const TableDefaultProps = {};
function Table(p: TableProps & typeof TableDefaultProps) {
  return (
    <StyledTableWrapper>
      <StyledTable
        {...StylesDefaultProps} {...p.styles} {...p}
        className="Table"
      >
        {p.children}
      </StyledTable>
    </StyledTableWrapper>
  );
}

Table.defaultProps = TableDefaultProps;
export default Table;

// 스타일 컴포넌트
const StyledTableWrapper = styled.div`
  overflow-x: auto;

  // 스크롤 바 스타일 지정
  & {
    &::-webkit-scrollbar {
      width: 0.5em; /* 세로 스크롤바의 너비 */
      height: 0.5em; /* 가로 스크롤바의 너비 */
    }
    
    &::-webkit-scrollbar-thumb {
      height: 20%; /* 스크롤바의 길이 */
      background: rgb(128, 128, 128); /* 스크롤바의 색상 */
      border-radius: 0.3em;
    }
  }
`;

interface StylesProps {
  width?: string;
  minWidth?: string;
  borderStyle?: string;
  borderTop?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderRight?: string;
}
const StylesDefaultProps = {
  width: '100%',
  minWidth: '40rem',
  borderStyle: '1px solid #E6E8F0'
};
const StyledTable = styled.table<StylesProps & typeof StylesDefaultProps>`
  width: ${p => p.width};
  min-width: ${p => p.minWidth};
  border-collapse: collapse;
  border: ${p => p.borderStyle};
  border-top: ${p => p.borderTop};
  border-bottom: ${p => p.borderBottom};
  border-left: ${p => p.borderLeft};
  border-right: ${p => p.borderRight};
`;