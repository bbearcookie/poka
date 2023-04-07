import styled from 'styled-components';

export default styled.select`
  padding: 0 0.5em;
  font-family: inherit;
  border: 1px solid hsl(222, 9%, 78%);
  border-radius: 5px;
  font-size: 1em;

  &:focus {
    outline: none;
    border: 1px solid rgb(206, 28, 73);
    box-shadow: 0px 0px 1px 1px rgb(206, 28, 73);
    transition: all 0.25s;
  }
`;
