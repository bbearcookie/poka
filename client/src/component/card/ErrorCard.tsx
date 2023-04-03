import { CardHeader, CardBody } from '@component/card/basic/_styles';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import { AxiosError } from 'axios';
import { ResponseError } from '@type/response';
import { getErrorMessage } from '@util/request';
import { ErrorCard as StyledErrorCard } from './_styles';

interface Props {
  error: AxiosError<ResponseError, any> | string;
}

function ErrorCard({ error }: Props) {
  return (
    <StyledErrorCard>
      <CardHeader>
        <TitleLabel title="Error" />
      </CardHeader>
      <CardBody>{typeof error === 'string' ? error : getErrorMessage(error)}</CardBody>
    </StyledErrorCard>
  );
}

export default ErrorCard;
