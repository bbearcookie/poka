import { Link } from 'react-router-dom';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import CardListItem from '@component/card/basic/CardListItem';
import Button from '@component/form/Button';

interface Props {
  voucherId: number;
}

function VoucherLog({ voucherId }: Props) {
  return (
    <CardListItem title="기록">
      <Link to={`/admin/voucher/log/${voucherId}`}>
        <Button
          buttonTheme="primary"
          rightIcon={faArrowRight}
          iconMargin="1em"
          css={{
            padding: '0.7em 1.3em',
          }}
        >
          조회
        </Button>
      </Link>
    </CardListItem>
  );
}

export default VoucherLog;
