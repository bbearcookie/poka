import { css } from 'styled-components';

// 스크롤 바
export const scrollbar = css`
  &::-webkit-scrollbar {
    /* 스크롤바의 너비 */
    width: 0.5em;
    height: 0.5em;
  }

  &::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: rgb(43, 56, 82); /* 스크롤바의 색상 */
    border-radius: 0.7em;
  }

  &::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, 0.1); /* 스크롤바 뒷 배경 색상 */
  }
`;

// a 태그 기본 스타일 초기화
export const anchorReset = css`
  color: inherit;
  text-decoration: none;

  &:hover,
  &:active {
    text-decoration: none;
    color: inherit;
    background-color: inherit;
  }
`;

// 페이지 내용 패딩 스타일
export const contentsPadding = css`
  padding: 4em 15vh;

  @media screen and (max-width: 70rem) {
    padding: 4em 5vh;
  }

  @media screen and (max-width: 50rem) {
    padding: 4em 4vh;
    font-size: 0.9em;
  }

  @media screen and (max-width: 30rem) {
    padding: 3em 3vh;
    font-size: 0.8em;
  }
  
  @media screen and (max-width: 20rem) {
    padding: 3em 2vh;
    font-size: 0.8em;
  }
`;
