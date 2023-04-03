import styled from 'styled-components';
import { Card } from '@component/card/basic/_styles';
import { StyledUserProfile } from '../_styles';

export const StyledUserProfileInfo = styled(Card)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1em;
  padding: 1.5em;

  ${StyledUserProfile} {
    flex-grow: 1;
  }
`;
