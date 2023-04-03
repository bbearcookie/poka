import styled from 'styled-components';

export const Card = styled.article`
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;

  .text {
    margin: 0;
  }

  .description {
    margin: 0.2em 0;
    color: #65748b;
  }
`;

export const CardHeader = styled.header`
  padding: 1.5em;
  border-bottom: 1px solid #e5e7eb;

  .title {
    margin: 0.2em 0;
  }
`;

export const CardBody = styled.main`
  padding: 1.5em;

  &:empty {
    display: none;
  }

  .title {
    margin: 0 0 1em 0;
  }
`;

export const CardFooter = styled.footer`
  border-top: 1px solid #e5e7eb;
`;

export const CardList = styled.ul`
  margin: 0;
  padding: 0;
`;

export const CardListItem = styled.li`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  padding: 1.5em;

  @media screen and (max-width: 65rem) {
    flex-direction: column;
    gap: 0.5em;
  }
`;

export const ItemTitle = styled.div`
  flex-basis: 30%;
  color: #121828;
`;
