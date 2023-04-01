import React from 'react';
import { ResType } from '@api/query/voucher/useVoucherQuery';
import WriteLink from './WriteLink';
import TradeLink from './TradeLink';
import ShippingLink from './ShippingLink';
import { ButtonSection as StyledButtonSection } from './_styles';

interface Props {
  res: ResType;
}

function ButtonSection({ res }: Props) {
  return (
    <StyledButtonSection>
      {res.state === 'available' && 
      <>
        <WriteLink res={res} />
        <ShippingLink res={res} />
      </>}
      {res.state === 'trading' && <TradeLink res={res} />}
    </StyledButtonSection>
  );
}

export default ButtonSection;