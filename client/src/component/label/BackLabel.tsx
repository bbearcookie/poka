import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CLASS = 'BackLabel';
interface BackLabelProps {
  className?: string;
  to?: string;
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}
const BackLabelDefaultProps = {
  to: '#'
};

function BackLabel(p: BackLabelProps & typeof BackLabelDefaultProps) {
  return (
    <StyledLabel {...p}>
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
  width: fit-content;
  padding: 0.5em;
  margin: ${p => p.margin};
  margin-top: ${p => p.marginTop};
  margin-bottom: ${p => p.marginBottom};
  margin-left: ${p => p.marginLeft};
  margin-right: ${p => p.marginRight};

  &:hover { text-decoration: underline; }
  a { color: inherit; text-decoration: none; }
  .${CLASS}__icon { margin-right: 0.75em; }
`;