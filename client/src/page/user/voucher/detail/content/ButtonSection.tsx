import React from 'react';
import { ResType } from '@api/query/voucher/useVoucherQuery';
import WriteLink from './WriteLink';
import TradeLink from './TradeLink';
import ShippingLink from './ShippingLink';
import { ButtonSection as StyledButtonSection } from '@component/form/_styles';

interface Props {
  res: ResType;
}

function ButtonSection({ res }: Props) {
  return (
    <StyledButtonSection css={{ gap: '2em' }}>
      {res.state === 'available' && (
        <>
          <WriteLink res={res} />
          <ShippingLink res={res} />
        </>
      )}
      {res.state === 'trading' && <TradeLink res={res} />}
    </StyledButtonSection>
  );
}

export default ButtonSection;
