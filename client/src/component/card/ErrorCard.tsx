import React from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import { AxiosError } from 'axios';
import { ErrorType, getErrorMessage } from '@util/request';
import { StylesProps as CardStyles } from '@component/card/basic/Card';

interface ErrorCardProps {
  styles?: CardStyles;
  error: AxiosError<ErrorType, any> | null
  children?: React.ReactNode;
}

const ErrorCardDefaultProps = {};

function ErrorCard({ styles, error, children }: ErrorCardProps & typeof ErrorCardDefaultProps) {
  return (
    <Card styles={styles}>
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