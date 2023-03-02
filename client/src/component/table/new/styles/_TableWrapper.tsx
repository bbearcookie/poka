import styled from 'styled-components';

const TableWrapper = styled.div`
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

export default TableWrapper;