import styled from 'styled-components';

export const StyledGroupProfile = styled.section`
  margin: 2em 0;
  display: flex;
  align-items: center;
  gap: 1em;
  flex-wrap: wrap;

  .action-section {
    display: flex;
    gap: 1em;
  }

  .name {
    flex-grow: 1;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .MemberList {
    margin-bottom: 5em;
  }
`;