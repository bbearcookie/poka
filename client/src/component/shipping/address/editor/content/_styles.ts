import styled from 'styled-components';

export const InputLine = styled.div`
  display: flex;
  margin-bottom: 0.5em;

  .label-section {
    width: 9.5em;
    height: 2.5em;
    line-height: 2em;
    flex-shrink: 0;

    .icon {
      margin-right: 0.25em;
    }
  }

  .input-section {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  @media screen and (max-width: 50rem) {
    flex-direction: column;
  }
`;
