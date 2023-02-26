import React from 'react';
import { ResType } from '@api/query/shipping/useShippingRequestQuery';
import Payment from './Payment';
import Remove from './Remove';

interface Props {
  res: ResType;
}

function ButtonSection({ res }: Props) {
  return (
    <section className="button-section">
      <Payment res={res} />
      <Remove res={res} />
    </section>
  );
}

export default ButtonSection;