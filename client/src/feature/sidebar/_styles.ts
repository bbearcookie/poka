import styled from 'styled-components';
import { scrollbar } from '@util/_commonStyles';

export const StyledSidebar = styled.div`
  width: 15rem;
  height: 100vh;
  position: fixed;
  overflow-y: auto;
  background-color: #111827;
  color: #d1d5db;

  ${scrollbar}
`;

export const Background = styled.aside<{ isOpened: boolean }>`
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

export const Category = styled.ul`
  margin: 1.5em 0;
  padding: 0;
  list-style: none;
`;

export const CategoryTitle = styled.span`
  margin-left: 2em;
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: bold;
`;
