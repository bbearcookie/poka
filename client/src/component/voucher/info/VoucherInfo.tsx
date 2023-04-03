import { VoucherItem } from '@type/voucher';
import Card, { StylesProps } from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import { CardList } from '@component/card/basic/_styles';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import {
  VoucherID,
  VoucherOwner,
  VoucherState,
  VoucherLog,
  Description,
} from './_contents';

interface Props {
  voucher: VoucherItem;
  displayType: 'admin' | 'user';
  styles?: StylesProps;
}

function VoucherInfo(props: Props) {
  const { displayType, voucher, styles } = props;

  return (
    <article>
      <Card styles={styles}>
        <CardHeader>
          <TitleLabel title="소유권 정보" />
        </CardHeader>

        <CardBody styles={{ padding: '0' }}>
          {displayType === 'admin' && (
            <CardList>
              <VoucherID {...voucher} />
              <VoucherOwner {...voucher} />
              <VoucherState voucherState={voucher.state} />
              <VoucherLog {...voucher} />
            </CardList>
          )}

          {displayType === 'user' && (
            <CardList>
              <VoucherOwner {...voucher} />
              <VoucherState voucherState={voucher.state} />
            </CardList>
          )}
        </CardBody>

        <Description />
      </Card>
    </article>
  );
}

export default VoucherInfo;
