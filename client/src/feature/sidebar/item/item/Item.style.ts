import styled from 'styled-components';

export const StyledItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75em;
  margin: 0.2em 1em;
  padding: 0 1em;
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

  &.active {
    color: #ec1b5a;
  }

  &.active_with_background {
    background-color: #242a38;
    color: #ec1b5a;
  }
`;