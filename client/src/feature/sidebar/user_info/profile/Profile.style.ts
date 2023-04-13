import styled from 'styled-components';

export const StyledProfile = styled.div<{ isOpened: boolean }>`
  display: flex;
  align-items: center;
  gap: 1em;
  margin: 1em;
  padding: 0em 1em;
  height: 4em;
  border-radius: 10px;
  user-select: none;
  cursor: pointer;
  transition: 0.2s ease-in all;

  &:hover {
    background-color: #242a38;
  }

  .img {
    width: 3em;
    height: 3em;
    border-radius: 50%;
  }

  .info-section {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .nickname {
      max-height: 2.5em;
      overflow: hidden;
      margin: 0.1em 0;
      color: white;
    }

    .role {
      font-size: 0.8em;
    }
  }
`;
