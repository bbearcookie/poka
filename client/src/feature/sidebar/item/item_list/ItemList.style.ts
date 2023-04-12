import styled from 'styled-components';

export const StyledItemList = styled.ul<{ isOpened: boolean; length: number }>`
  padding: 0;
  overflow: hidden;
  height: ${p => (p.isOpened ? 2.9 * p.length + 'em' : '0em')};
  transition-property: height;
  transition-timing-function: ease-in;
  transition-duration: ${p => 0.1 + p.length * 0.03 + 's'};
`;
