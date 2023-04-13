import styled from 'styled-components';
import { scrollbar } from '@util/_commonStyles';

export const StyledSidebar = styled.aside`
  width: 15rem;
  height: 100vh;
  position: fixed;
  overflow-y: auto;
  background-color: #111827;
  color: #d1d5db;

  ${scrollbar}
`;

export const Background = styled.section<{ isOpened: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 99;

  @media screen and (max-width: 65rem) {
    width: ${p => (p.isOpened ? '100%' : '0')};
    height: ${p => (p.isOpened ? '100%' : '0')};

    ${StyledSidebar} {
      transform: ${p => (p.isOpened ? '' : 'translateX(-15rem)')};
      transition: 0.25s transform;
    }
  }
`;
