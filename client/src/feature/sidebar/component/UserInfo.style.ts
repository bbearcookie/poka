import styled from 'styled-components';

export const StyledUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  margin: 1em;
  padding: 1em;
  height: 4em;
  background-color: rgba(102, 51, 255, 0.5);
  border-radius: 10px;

  .img {
    width: 3em;
    height: 3em;
    border-radius: 50%;
  }

  .info-section {
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
