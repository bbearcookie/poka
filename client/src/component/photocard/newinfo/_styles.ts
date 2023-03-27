import styled from 'styled-components';

export interface StyledPhotoInfoProps {
  margin?: string;
  backgroundColor?: string;
  border?: string;
  boxShadow?: string;
}
export const StyledPhotoInfo = styled.section<StyledPhotoInfoProps>`
  display: flex;
  gap: 1em;
  width: fit-content;
  margin: ${p => p.margin};
  padding: 1.5em;
  background-color: white;
  border-radius: 10px;
  background-color: ${p => p.backgroundColor};
  border: ${p => p.border};
  box-shadow: ${p => p.boxShadow || '0px 0px 10px 0px #c0c0c0'};

  .main {
    width: 10em;
  }

  .aside {
    width: 10em;

    .member-section {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      margin-bottom: 0.5em;

      .group-name {
        width: fit-content;
        margin: 0.5em 0;
        padding: 0 0.4em;
        background-color: #e5e7eb;
        border-radius: 5px;
      }
    }

    .footer {
      border-top: 1px solid #e5e7eb;
      margin: 0em -1em;
      padding: 1em 1em 0 1em;
    }
  }

  @media screen and (max-width: 40rem) {
    flex-direction: column;
  }
`;
