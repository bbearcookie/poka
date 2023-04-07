import styled from 'styled-components';
import { Card, CardHeader, CardBody } from '@component/card/basic/_styles';
import TitleLabel from '@component/label/TitleLabel';
import { AxiosError } from 'axios';
import { ResponseError } from '@type/response';
import { getErrorMessage } from '@util/request';

interface Props {
  error: AxiosError<ResponseError, any> | string;
}

function ErrorCard({ error, ...rest }: Props) {
  return (
    <Card {...rest}>
      <CardHeader>
        <TitleLabel title="Error" />
      </CardHeader>
      <CardBody>{typeof error === 'string' ? error : getErrorMessage(error)}</CardBody>
    </Card>
  );
}

export default styled(ErrorCard)``;
