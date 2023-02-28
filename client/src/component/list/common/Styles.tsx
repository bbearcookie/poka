import React from 'react';
import styled from 'styled-components';

export const FilterSection = styled.div`
  padding: 1.5em 1.5em 0 1.5em;
  display: flex;
  flex-wrap: wrap;
  gap: 2em;

  .DropdownButton .icon { margin-left: 0.7em; }

  .DropdownItem {
    display: flex;
    flex-wrap: wrap;

    input[type="checkbox"], input[type="radio"] {
      margin-right: 0.4em;
      transform: scale(1.25);
      cursor: pointer;
    }

    label {
      flex-grow: 1;
      cursor: pointer;
    }
  }
`

export const SearchLabelSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  padding: 1.5em 1.5em 0 1.5em;

  &:empty { padding: 0; }
`

export const SearchSection = styled.div`
  display: flex;
  flex-direction: column;

  &:empty { display: none; }
`