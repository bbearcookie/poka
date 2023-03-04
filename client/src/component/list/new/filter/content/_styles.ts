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

interface FilterSectionProps {
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
}
export const FilterSection = styled.section<FilterSectionProps>`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5em;
  
  margin: ${p => p.margin};
  margin-top: ${p => p.marginTop};
  margin-bottom: ${p => p.marginBottom};
  margin-left: ${p => p.marginLeft};
  margin-right: ${p => p.marginRight};
`