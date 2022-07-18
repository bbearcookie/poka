import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CLASS = 'BackLabel';
interface BackLabelProps {
  className?: String;
  to?: string;
  children?: React.ReactNode;
}

const BackLabelDefaultProps = {
  to: '#'
};

function BackLabel(p: BackLabelProps & typeof BackLabelDefaultProps) {
  return (
    <StyledLabel>
      <Link to={p.to}>
        <FontAwesomeIcon className={`${CLASS}__icon`} icon={faArrowLeft} />
        {p.children}
      </Link>
    </StyledLabel>
  );
}

BackLabel.defaultProps = BackLabelDefaultProps;
export default BackLabel;

const StyledLabel = styled.div<BackLabelProps>`
  padding: 0.5em;
  width: fit-content;

  &:hover { text-decoration: underline; }
  a { color: inherit; text-decoration: none; }
  .${CLASS}__icon { margin-right: 0.75em; }
`;