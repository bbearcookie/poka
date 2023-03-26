import styled from 'styled-components';

export const StyledShipping = styled.tr`
  cursor: pointer;
  transition: 0.1s all;

  &:hover {
    background-color: rgb(249, 249, 250);
  }

  .photo-section {
    .img {
      width: 4.7em;
      height: 7em;
    }

    .name {
      margin: 0.3em 0;
    }

    .amount {
      margin: 0;
      font-size: 0.75em;
      color: #65748B;
    }
  }
`;