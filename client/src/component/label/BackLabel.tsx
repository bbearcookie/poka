import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface Props {
  to?: string;
  onClick?: React.MouseEventHandler;
  children?: React.ReactNode;
}

function BackLabel({ to = '#', onClick, children, ...rest }: Props) {
  return (
    <span {...rest} onClick={onClick}>
      <Link to={to}>
        <FontAwesomeIcon className="icon" icon={faArrowLeft} />
        {children}
      </Link>
    </span>
  );
}

export default styled(BackLabel)<Props>`
  display: inline-block;
  width: fit-content;
  padding: 0.5em;

  &:hover {
    text-decoration: underline;
  }

  .icon {
    margin-right: 0.75em;
  }
`;
