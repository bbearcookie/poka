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

interface KeywordSectionProps {
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
}

export const KeywordSection = styled.section<KeywordSectionProps>`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  
  margin: ${p => p.margin};
  margin-top: ${p => p.marginTop};
  margin-bottom: ${p => p.marginBottom};
  margin-left: ${p => p.marginLeft};
  margin-right: ${p => p.marginRight};
  
  &:empty { display: none; }
`