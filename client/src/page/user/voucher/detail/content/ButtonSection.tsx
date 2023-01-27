import React from 'react';
import { ResType as VoucherResType } from '@api/query/voucher/useVoucherQuery';
import WriteLink from './WriteLink';
import TradeLink from './TradeLink';
import ShippingLink from './ShippingLink';

interface Props {
  voucher: VoucherResType;
}
const DefaultProps = {};

function ButtonSection({ voucher }: Props) {
  return (
    <section className="button-section">
      {voucher.state === 'available' && 
      <>
        <WriteLink voucher={voucher} />
        <ShippingLink voucher={voucher} />
      </>}
      {voucher.state === 'trading' && <TradeLink voucher={voucher} />}
    </section>
  );
}

export default ButtonSection;