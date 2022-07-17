import React from 'react';
import classNames from 'classnames';
import WhiteCard, { WhiteCardBody, WhiteCardHeader } from '@component/card/WhiteCard';
import { AxiosError } from 'axios';
import { ErrorType, getErrorMessage } from '@util/commonAPI';

interface ErrorCardProps {
  className?: string;
  error: AxiosError<ErrorType, any> | null
  children?: React.ReactNode;
}

const ErrorCardDefaultProps = {};

function ErrorCard({ className, error, children }: ErrorCardProps & typeof ErrorCardDefaultProps) {
  return (
    <WhiteCard className={classNames("ErrorCard", className)}>
      <WhiteCardHeader>
        <h1 className="card-label">Error</h1>
      </WhiteCardHeader>
      <WhiteCardBody>
        {error && <p>{getErrorMessage(error)}</p>}
        {!error && <p>오류 발생</p>}
      </WhiteCardBody>
    </WhiteCard>
  );
}

ErrorCard.defaultProps = ErrorCardDefaultProps;

export default ErrorCard;