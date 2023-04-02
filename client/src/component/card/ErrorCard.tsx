import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import { AxiosError } from 'axios';
import { ResponseError } from '@type/response';
import { getErrorMessage } from '@util/request';
import { StylesProps as CardStyles } from '@component/card/basic/Card';

interface Props {
  error: AxiosError<ResponseError, any> | string;
  styles?: CardStyles;
}

function ErrorCard({ styles, error }: Props) {
  return (
    <Card styles={styles}>
      <CardHeader>
        <TitleLabel title="Error" />
      </CardHeader>
      <CardBody>
        <p>{typeof error === 'string' ? error : getErrorMessage(error)}</p>
      </CardBody>
    </Card>
  );
}

export default ErrorCard;
