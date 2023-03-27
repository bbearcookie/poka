import styled, { css } from 'styled-components';
import { scrollbar } from '@util/_commonStyles';

const ulStyle = css`
  padding: 0;
  list-style: none;
`;

export const StyledIdolSelector = styled.article<{ margin?: string }>`
  margin: ${p => p.margin};
  padding: 1em;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
`;

export const StyledGroupSelector = styled.ul`
  ${ulStyle}
  ${scrollbar}
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  .group-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 6em;
    padding: 0.5em;
    border-radius: 10px;
    user-select: none;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    .img {
      width: 4em;
      height: 4em;
      border: 3px solid transparent;
      border-radius: 50%;
      transition: border 0.3s;
    }

    .name {
      width: 100%;
      margin: 0.2em 0;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
    }

    &:hover,
    &.active {
      color: #ff6f61;
      background-color: rgb(251, 235, 210);
    }

    &.active {
      font-weight: bold;

      .img {
        border: 3px solid #ff6f61;
      }
    }
  }
`;

export const StyledMemberSelector = styled.ul`
  ${ulStyle}
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1em;

  .member-item {
    min-width: 3em;
    padding: 0.75em;
    border: 1px solid #e5e7eb;
    box-shadow: 2px 2px 0px 0px #c0c0c0;
    border-radius: 10px;
    text-align: center;
    user-select: none;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    &.active,
    &:hover {
      color: #ff6f61;
      background-color: rgb(251, 235, 210);
      border: 1px solid rgb(250, 227, 194);
    }

    &.active {
      font-weight: bold;
    }
  }
`;
