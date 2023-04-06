import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PhotoSection = styled.section``;
export const InfoSection = styled.section``;

export const StyledTradeItem = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 1em;
  box-shadow: 0px 0px 10px 0px #c0c0c0;
  border-radius: 10px;
  cursor: pointer;
  background-color: white;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgb(249, 249, 250);
  }

  ${PhotoSection} {
    display: flex;
    margin: 0 auto;

    .written-time {
      margin: 0.2em 0;
      font-size: 0.8rem;
      color: #a6a6a6;
    }
  }

  ${InfoSection} {
    display: flex;
    flex-direction: column;
    width: 100%;

    .want-section {
      margin: 1em 0;
      flex-grow: 1;

      .want-label {
        font-size: 0.8rem;
        color: #a6a6a6;
      }

      .images {
        display: grid;
        gap: 1em;
        grid-template-columns: repeat(auto-fill, minmax(5em, 1fr));
        justify-items: center;
      }
    }

    .author-section {
      margin: 1em 0;

      .author-label {
        margin: 0.5em 0;
      }
    }
  }
`;