import styled from 'styled-components';

export const StyledAddress = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 1.5em;
  border-bottom: 1px solid #e5e7eb;

  .content-section {
    width: 100%;
    margin: 0.1em 0;
    display: flex;
    align-items: center;
    gap: 0.5em;

    &.name-section {
      margin-bottom: 1em;
    }

    .name {
      font-size: 1.2em;
    }

    .prime {
      padding: 0.3em;
      border: 1px solid #a39d9d;
      border-radius: 20px;
      font-size: 0.7rem;
      color: #a39d9d;
      user-select: none;
    }

    .text {
      margin: 0 0 0.5em 0;
    }
  }
`;

export const IconSection = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
