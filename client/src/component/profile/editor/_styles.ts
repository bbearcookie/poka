import styled from 'styled-components';
import { Card } from '@component/card/new/Card';

export const StyledUserProfileEditor = styled(Card)`
  display: flex;
  gap: 1em;
  padding: 1.5em;

  .label {
    margin: 0 0 0.4em 0;
  }

  .image-section {
    text-align: center;
  }

  .content-section {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 1em;

    .nickname-section {
      flex-grow: 1;
    }

    .button-section {
      align-self: flex-end;
    }
  }

  @media screen and (max-width: 30rem) {
    flex-direction: column;
  }
`;
