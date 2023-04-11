import styled from 'styled-components';

export const StyledItem = styled.li`
  margin: 0.2em 1em;
  padding: 0 1em;
  display: flex;
  align-items: center;
  gap: 0.75em;
  height: 2.5em;
  line-height: 2.5em;
  user-select: none;
  cursor: pointer;
  transition: 0.2s ease-in all;

  .text {
    flex-grow: 1;
  }

  &:hover {
    background-color: #242a38;
  }

  &.parent-active {
    color: #ec1b5a;
  }

  &.active {
    background-color: #242a38;
    color: #ec1b5a;
  }
`;

export const StyledItemList = styled.ul<{ isOpened: boolean; length: number }>`
  padding: 0;
  overflow: hidden;
  height: ${p => (p.isOpened ? 2.9 * p.length + 'em' : '0em')};
  transition-property: height;
  transition-timing-function: ease-in;
  transition-duration: ${p => 0.1 + p.length * 0.03 + 's'};
`;

export const ParentWrapper = styled.li`
  display: flex;
  flex-direction: column;
  padding: 0;

  .parent-list {
    padding: 0;
  }

  ${StyledItemList} ${StyledItem} {
    padding-left: 2.5em;
  }
`;
