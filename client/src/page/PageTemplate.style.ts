import styled from 'styled-components';
import OpenButton from '@feature/sidebar/item/OpenButton';

export const StyledPageTemplate = styled.div`
  color: #121828;

  a {
    color: inherit;
    text-decoration: none;
    background-color: inherit;
  }

  .page-section {
    padding-left: 15rem; // 사이드 바 크기만큼 패딩
    min-height: 100vh;
    background-color: #f9fafc;
  }

  @media screen and (max-width: 65rem) {
    ${OpenButton} {
      display: flex;
    }

    .page-section {
      padding-left: 0;
    }
  }
`;
