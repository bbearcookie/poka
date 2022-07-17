import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import './BackLabel.scss';

interface BackLabelProps {
  className?: String;
  children?: React.ReactNode;
  to?: string;
}

const BackLabelDefaultProps = {
  to: '#'
};

function BackLabel({ className, to, children }: BackLabelProps & typeof BackLabelDefaultProps) {
  return (
    <div className={classNames("BackLabel", className)}>
      <Link to={to}>
        <FontAwesomeIcon className="icon" icon={faArrowLeft} />
        {children}
      </Link>
    </div>
  );
}

BackLabel.defaultProps = BackLabelDefaultProps;

export default BackLabel;