import styled from 'styled-components';

export interface Props {
  width?: string;
  minWidth?: string;
  itemHeight?: string;
  itemPadding?: string;
}

const StyledTable = styled.table<Props>`
  width: ${p => p.width ? p.width : '100%'};
  min-width: ${p => p.minWidth ? p.minWidth : '40rem'};
  border-collapse: collapse;
  text-align: left;

  th, td {
    height: ${p => p.itemHeight};
    padding: ${p => p.itemPadding};
  }
  th:last-child, td:last-child { text-align: right; }

  thead {
    height: ${p => p.itemHeight};
    background-color: #F3F4F6;
    color: #374151;
  }

  tbody {
    height: ${p => p.itemHeight};
    background-color: white;

    .action-section {
      display: flex;
      justify-content: flex-end;
    }
  }
`

export default StyledTable;