import styled from "styled-components";

interface SearchSectionProps {
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
}

export const SearchSection = styled.section<SearchSectionProps>`
  display: flex;
  gap: 1em;
  margin: ${p => p.margin};
  margin-top: ${p => p.marginTop};
  margin-bottom: ${p => p.marginBottom};
  margin-left: ${p => p.marginLeft};
  margin-right: ${p => p.marginRight};

  @media screen and (max-width: 25rem) {
    flex-direction: column;

    .Select { width: 100%; }
  }
`

export const StyledSearchBar = styled.div`
  display: flex;
  width: 100%;
  height: 3em;
  align-items: center;
  border-radius: 10px;
`

export const StyledInput = styled.input`
  padding: 0 0.5em;
  width: 100%;
  height: 100%;
  border: 1px solid #E5E7EB;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border: 1px solid rgb(206, 28, 73);
    box-shadow: 0px 0px 1px 1px rgb(206, 28, 73);
    transition:
      border 0.25s,
      box-shadow 0.25s;
  }
`

export const StyledButton = styled.button`
  height: 100%;
  color: white;
  background-color: #EC1B5A;
  border: 10px solid #EC1B5A;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
  transition: all 0.25s;

  &:hover {
    background-color: #c40e45;
    border: 10px solid #c40e45;
  }

  &:active {
    .icon {
      position: relative;
      top: 1px;
    }
  }
`