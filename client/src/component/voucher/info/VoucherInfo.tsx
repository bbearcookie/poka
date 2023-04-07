import { VoucherItem } from '@type/voucher';
import { CSSProp } from 'styled-components';
import { CardHeader, CardList } from '@component/card/basic/_styles';
import TitleLabel from '@component/label/TitleLabel';
import VoucherID from './content/VoucherID';
import VoucherOwner from './content/VoucherOwner';
import VoucherState from './content/VoucherState';
import VoucherLog from './content/VoucherLog';
import Description from './content/Description';
import { VoucherInfo as StyledVoucherInfo } from './_styles';

interface Props {
  voucher: VoucherItem;
  displayType: 'admin' | 'user';
  cssProp?: CSSProp;
}

function VoucherInfo({ voucher, displayType, cssProp }: Props) {
  return (
    <StyledVoucherInfo css={cssProp}>
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
    </StyledVoucherInfo>
  );
}

export default VoucherInfo;
