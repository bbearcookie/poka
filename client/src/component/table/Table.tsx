import React from 'react';
import styled from 'styled-components';

interface Props {
  styles?: StylesProps;
  children?: React.ReactNode;
}
const DefaultProps = {};
function Table({ styles, children }: Props) {
  return (
    <StyledTableWrapper>
      <StyledTable className="Table" {...styles}>
        {children}
      </StyledTable>
    </StyledTableWrapper>
  );
}

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
const StyledTable = styled.table<StylesProps>`
  width: ${p => p.width ? p.width : '100%'};
  min-width: ${p => p.minWidth ? p.minWidth : '40rem'};
  border-collapse: collapse;
  border: ${p => p.borderStyle ? p.borderStyle : '1px solid #E6E8F0'};
  border-top: ${p => p.borderTop};
  border-bottom: ${p => p.borderBottom};
  border-left: ${p => p.borderLeft};
  border-right: ${p => p.borderRight};
`;