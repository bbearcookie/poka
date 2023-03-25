import styled from 'styled-components';

export const StylesPhotocardItem = styled.section`
  width: fit-content;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px #c0c0c0;

  .main {
    padding: 1.25em;

    .img {
      width: 9.375em;
      height: 14em;
    }

    .name-section {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 1em 0;
      padding: 0 0.5em;
      width: 100%;
      max-width: 9.375em;
      height: 3.5em;
      box-sizing: border-box;
      border-radius: 5px;
      background-color: #242a38;
      color: white;

      .name {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-align: center;
        word-break: keep-all;
        overflow: hidden;
      }
    }

    .info-section {
      display: flex;
      margin-bottom: 0.5em;

      .member-section {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        .member-name {
        }

        .group-name {
          width: fit-content;
          margin-top: 0.5em;
          padding: 0 0.4em;
          background-color: #e5e7eb;
          border-radius: 5px;
        }
      }

      .icon-section {
        align-self: flex-end;
      }
    }
  }

  .footer {
    border-top: 1px solid #e5e7eb;
    padding: 1.25em;
  }
`;
