import styled from 'styled-components';

export const StyledDescription = styled.section`
  color: #65748b;
  padding: 1.5em;

  .states {
    display: flex;
    flex-direction: column;
    gap: 0.7em;
    list-style: none;
    margin: 0;
    padding: 0;

    .state-item {
      display: flex;
      align-items: center;
      gap: 0.5em;

      @media screen and (max-width: 65rem) {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }
`;
