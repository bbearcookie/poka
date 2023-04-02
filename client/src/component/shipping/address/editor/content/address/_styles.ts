import styled from 'styled-components';

export const PostcodeSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-bottom: 0.5em;
`;

export const AddressSection = styled.div`
  display: flex;
  gap: 0.5em;

  .Input {
    flex-basis: 50%;
  }

  @media screen and (max-width: 50rem) {
    flex-direction: column;
  }
`;
