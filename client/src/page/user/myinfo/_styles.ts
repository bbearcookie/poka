import styled from 'styled-components';
import { contentsPadding } from '@util/_commonStyles';
import { ErrorCard } from '@component/card/_styles';

export const StyledIndex = styled.main`
  ${contentsPadding}

  .profile-section, ${ErrorCard} {
    margin-bottom: 5em;
  }
`;

export const ButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
`;
