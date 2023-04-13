import styled from 'styled-components';
import { contentsPadding } from '@util/_commonStyles';

export const StyledIndex = styled.main`
  ${contentsPadding}

  .Card {
    .label {
      margin: 0 0 1em 0;
    }
    .text {
      margin: 0;
    }
  }

  .PhotoList {
    margin-bottom: 2em;
  }

  .SelectCard {
    flex-grow: 1;
  }

  .info-section {
    display: flex;
    gap: 1em;
    justify-content: space-between;
    margin-bottom: 2em;

    @media screen and (max-width: 40rem) {
      flex-direction: column;
    }
  }
`;
