import styled from 'styled-components';
import { Card } from '@component/card/basic/_styles';
import { contentsPadding } from '@util/_commonStyles';

export const StyledIndex = styled.main`
  ${contentsPadding}

  .card-section {
    display: flex;
    gap: 2em;
    margin-bottom: 2em;

    ${Card} {
      width: 100%;
    }

    @media screen and (max-width: 45rem) {
      flex-direction: column;
    }
  }

  .control-section {
    display: flex;
    gap: 2em;
  }

  .item-section {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;

    &:empty {
      display: none;
    }
  }
`;
