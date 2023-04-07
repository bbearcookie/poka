import styled from 'styled-components';
import { Card, CardBody } from '@component/card/basic/_styles';

export const StyledPhotoInfo = styled.div`
  .name-section {
    margin-top: 1em;
  }

  ${Card} {
    margin: 0 1em 2em 1em;
  }

  ${CardBody} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const PhotoSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const InputSection = styled.section`
  margin-bottom: 1em;

  .input-line {
    display: flex;
    align-items: center;

    .input-label {
      flex-shrink: 0;
    }
  }
`;

export const StyledUpload = styled.div`
  margin-left: 1em;
  padding: 1em;
  flex-basis: 7rem;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #65748b;
  background-color: #e5e7eb;
  border: 2px dashed #e5e7eb;
  border-radius: 5px;
  text-align: center;
  user-select: none;
  cursor: pointer;
  transition: 0.1s background-color;

  p {
    margin: 0;
  }

  &.isDragging {
    background-color: #bfc1c6;
  }

  &:hover {
    background-color: #dcdee1;
  }

  svg {
    margin-bottom: 0.3em;
  }

  input[type='file'] {
    display: none;
  }
`;
