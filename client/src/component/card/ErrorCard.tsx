import React from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import { AxiosError } from 'axios';
import { ResponseError } from '@type/response';
import { getErrorMessage } from '@util/request';
import { StylesProps as CardStyles } from '@component/card/basic/Card';

interface Props {
  styles?: CardStyles;
  error: AxiosError<ResponseError, any> | null
  children?: React.ReactNode;
}

function ErrorCard({ styles, error, children }: Props) {
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

export default ErrorCard;