import styled from 'styled-components';

export interface PhotoInfoStyles {
  margin?: string;
}

export const StyledPhotoInfo = styled.section<PhotoInfoStyles>`
  display: flex;
  gap: 1em;
  width: fit-content;
  margin: ${p => p.margin};
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px #c0c0c0;
  padding: 1.25em;
  text-align: center;

  .name-section {
    display: flex;
    flex-direction: column;

    .info-section {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .member-name {
        margin: 0.5em 0;
        font-size: 1.5em;
      }
      .group-name {
        margin: 0;

        .group-label {
          padding: 0 0.4em;
          background-color: #e5e7eb;
          border-radius: 5px;
        }
      }
    }
  }

  @media screen and (max-width: 30rem) {
    flex-direction: column;
  }
`;
