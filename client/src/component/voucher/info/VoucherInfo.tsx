import { VoucherItem } from '@type/voucher';
import Card, { StylesProps } from '@component/card/basic/Card';
import { CardHeader } from '@component/card/basic/_styles';
import { CardList } from '@component/card/basic/_styles';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import VoucherID from './content/VoucherID';
import VoucherOwner from './content/VoucherOwner';
import VoucherState from './content/VoucherState';
import VoucherLog from './content/VoucherLog';
import Description from './content/Description';

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

        <Description />
      </Card>
    </article>
  );
}

export default VoucherInfo;
