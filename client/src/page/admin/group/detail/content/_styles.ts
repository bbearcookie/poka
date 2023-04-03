import styled from 'styled-components';

export const StyledGroupProfile = styled.section`
  margin: 2em 0;
  display: flex;
  align-items: center;
  gap: 1em;
  flex-wrap: wrap;

  .name {
    flex-grow: 1;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .MemberList {
    margin-bottom: 5em;
  }
`;

export const ButtonSection = styled.section`
  display: flex;
  justify-content: flex-end;
`;
