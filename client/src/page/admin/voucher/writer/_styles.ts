import styled from 'styled-components';
import { contentsPadding } from '@util/_commonStyles';

export const StyledIndex = styled.main`
  ${contentsPadding}

  .button-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: right;
    gap: 1em;
  }
`;
