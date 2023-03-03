import styled from "styled-components";

export const StyledFilter = styled.div`
  .button {
    padding: 0.25em;

    .icon { margin-left: 0.5em; }
  }

  .menu {
    min-width: 10em;
    max-height: 20em;

    .item {
      display: flex;
      flex-wrap: wrap;
      
      input {
        margin-right: 0.4em;
        transform: scale(1.25);
        cursor: pointer;
      }
    }
  }
`