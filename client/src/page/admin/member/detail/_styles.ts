import styled from 'styled-components';
import { contentsPadding } from '@util/_commonStyles';

export const StyledIndex = styled.main`
  ${contentsPadding}

  .name-section {
    margin-bottom: 2rem;

    p {
      margin: 0.4em 0;
    }

    .name-label {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .group-name-label {
      background-color: #e5e7eb;
      padding: 0 0.4em;
      border-radius: 5px;
    }
  }
`;
