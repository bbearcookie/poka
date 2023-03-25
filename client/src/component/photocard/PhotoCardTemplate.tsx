import React from 'react';
import styled from 'styled-components';

export const PhotoName = styled.div<{ width?: string; margin?: string; }>`
  margin: ${p => p.margin};
  padding: 0 0.5em;
  width: ${p => p.width ? p.width : "100%"};
  height: 3.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #242A38;
  color: white;
  border-radius: 5px;
  box-sizing: border-box;

  p {
    margin: 0;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-break: keep-all;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`