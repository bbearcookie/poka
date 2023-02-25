import React from 'react';
import { ResType } from '@api/query/shipping/useShippingRequestQuery';
import ShippingInfoSection from './content/ShippingInfoSection';
import VoucherSection from './content/VoucherSection';

interface Props {
  res: ResType;
}
const DefaultProps = {};

function Success({ res }: Props) {
  return (
    <>
      <ShippingInfoSection res={res} />
      <VoucherSection res={res} />
    </>
  );
}

export default Success;