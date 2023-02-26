import React from 'react';
import { ResType } from '@api/query/shipping/useShippingRequestQuery';
import ShippingInfoSection from './content/ShippingInfoSection';
import VoucherSection from './content/VoucherSection';
import ButtonSection from './content/ButtonSection';

interface Props {
  res: ResType;
}
const DefaultProps = {};

function Success({ res }: Props) {
  return (
    <>
      <ShippingInfoSection res={res} />
      <VoucherSection res={res} />
      <ButtonSection res={res} />
    </>
  );
}

export default Success;