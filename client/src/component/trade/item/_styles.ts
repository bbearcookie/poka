import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PhotoImg as DefaultPhotoImg } from '@component/photocard/item/_styles';
import { Profile } from '@component/profile/UserProfile';
import { anchorReset } from '@util/_commonStyles';

export const PhotoSection = styled.section``;
export const InfoSection = styled.section``;

export const StyledTradeItem = styled(Link)`
  ${anchorReset}
  display: flex;
  padding: 1em;
  gap: 2em;
  box-shadow: 0px 0px 10px 0px #c0c0c0;
  border-radius: 10px;
  cursor: pointer;
  background-color: white;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgb(249, 249, 250);
  }

  ${PhotoSection} {
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

    .author-section {
      flex-grow: 1;

      .author-label {
        margin: 0.5em 0;
      }
    }

    .description {
      font-size: 0.8rem;
      color: #a6a6a6;
    }

    .want-section {
      display: grid;
      gap: 1em;
      grid-template-columns: repeat(auto-fill, minmax(5em, 1fr));
      justify-items: center;
    }
  }

  @media screen and (max-width: 30rem) {
    flex-direction: column;
    align-items: center;

    ${Profile} {
      justify-content: center;
    }

    ${InfoSection} {
      .author-section {
        align-items: center;
        text-align: center;
      }
    }
  }
`;

export const PhotoImg = styled(DefaultPhotoImg)``;
