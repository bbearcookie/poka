import React from 'react';
import { ResType } from '@api/query/voucher/useVoucherQuery';
import WriteLink from './WriteLink';
import TradeLink from './TradeLink';
import ShippingLink from './ShippingLink';

interface Props {
  res: ResType;
}

function ButtonSection({ res }: Props) {
  return (
    <section className="button-section">
      {res.voucher.state === 'available' && 
      <>
        <WriteLink res={res} />
        <ShippingLink res={res} />
      </>}
      {res.voucher.state === 'trading' && <TradeLink res={res} />}
    </section>
  );
}

export default ButtonSection;