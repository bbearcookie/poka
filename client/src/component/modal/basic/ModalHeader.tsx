import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

interface Props {
  titleName: string;
  handleClose: () => void;
}
const DefaultProps = {};

function ModalHeader({ titleName, handleClose }: Props) {
  return (
    <StyledHeader>
      <TitleLabel>{titleName}</TitleLabel>
      <IconButton onClick={handleClose}>
        <FontAwesomeIcon icon={faClose} />
      </IconButton>
    </StyledHeader>
  );
}

export default ModalHeader;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  font-size: 1.75em;
`;

const TitleLabel = styled.h1`
  margin: 0;
  flex-grow: 1;
`

const IconButton = styled.div`
  color: gray;
  padding: 0 0.5rem;
  border-radius: 0.3rem;
  transition: background-color 0.5s;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: inherit;
    background-color: rgb(249, 249, 250);
  }
`