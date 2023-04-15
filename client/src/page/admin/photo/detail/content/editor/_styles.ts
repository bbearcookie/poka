import styled from 'styled-components';
import { ButtonSection } from '@component/form/_styles';

export const PhotoSection = styled.section`
  display: flex;
  gap: 1em;

  @media screen and (max-width: 30rem) {
    flex-direction: column;
  }
`;

export const DescriptionSection = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  p {
    margin: 0.4em 0;
    word-break: break-all;
  }

  ${ButtonSection} {
    margin-top: auto;
  }
`;
