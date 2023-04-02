import styled from 'styled-components';

export const StyledUserProfile = styled.section`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1em;
  color: #121828;

  .img {
    width: 5em;
    height: 5em;
    border-radius: 50%;
  }

  .user-section {
    flex-grow: 1;
    
    .nickname {
      margin: 0 0 0.2em 0;
      font-size: 1.3em;
    }

    .username-label {
      margin: 0;

      .username {
        padding: 0 0.4em;
        background-color: #e5e7eb;
        border-radius: 5px;
        word-break: keep-all;
      }
    }
  }
`;
