import React from 'react';
import classNames from 'classnames';
import './WhiteCard.scss';

interface WhiteCardProps {
  className?: string;
  children?: React.ReactNode;
}

const WhiteCardDefaultProps = {};

function WhiteCard({ className, children }: WhiteCardProps & typeof WhiteCardDefaultProps) {
  return (
    <article className={classNames("WhiteCard", className)}>
      {children}
    </article>
  );
}

WhiteCard.defaultProps = WhiteCardDefaultProps;
export default WhiteCard;

// Header
interface WhiteCardHeaderProps {
  children?: React.ReactNode;
}

const WhiteCardHeaderDefaultProps = {};

export function WhiteCardHeader({ children }: WhiteCardHeaderProps & typeof WhiteCardHeaderDefaultProps) {
  return (
    <article className="WhiteCardHeader">
      {children}
    </article>
  );
}

// Body
interface WhiteCardBodyProps {
  children?: React.ReactNode;
}

const WhiteCardBodyDefaultProps = {};

export function WhiteCardBody({ children }: WhiteCardBodyProps & typeof WhiteCardBodyDefaultProps) {
  return (
    <article className="WhiteCardBody">
      {children}
    </article>
  );
}