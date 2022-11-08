import React from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import { AxiosError } from 'axios';
import { ErrorType, getErrorMessage } from '@util/commonAPI';

interface ErrorCardProps {
  styles?: {
    margin?: string;
    marginTop?: string;
    marginBottom?: string;
    marginLeft?: string;
    marginRight?: string;
  }
  error: AxiosError<ErrorType, any> | null
  children?: React.ReactNode;
}

const ErrorCardDefaultProps = {};

function ErrorCard({ styles, error, children }: ErrorCardProps & typeof ErrorCardDefaultProps) {
  return (
    <Card {...styles}>
      <CardHeader>
        <h1>Error</h1>
      </CardHeader>
      <CardBody>
        {error && <p>{getErrorMessage(error)}</p>}
        {!error && <p>오류 발생</p>}
      </CardBody>
    </Card>
  );
}

ErrorCard.defaultProps = ErrorCardDefaultProps;
export default ErrorCard;