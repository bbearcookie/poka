import styled from 'styled-components';
import { anchorReset, contentsPadding } from '@util/_commonStyles';

export const StyledIndex = styled.main`
  ${contentsPadding}

  a {
    ${anchorReset}
  }

  .MemberList {
    margin-bottom: 5em;
  }
`;
