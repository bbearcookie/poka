import styled from "styled-components";

export const StyledKeyword = styled.span`
  padding: 0.75em 1em;
  border: 1px solid #D1D5DB;
  border-radius: 5em;

  .icon {
    margin-left: 0.35em;
    color: #D1D5DB;
    cursor: pointer;

    &:hover { color: #b1b6bd; }
  }
`

export const KeywordSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
`