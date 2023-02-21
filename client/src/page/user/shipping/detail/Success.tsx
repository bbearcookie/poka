import React from 'react';
import { ResType } from '@api/query/shipping/useShippingRequestQuery';
import ShippingInfoSection from './content/ShippingInfoSection';

interface Props {
  res: ResType;
}
const DefaultProps = {};

function Success({ res }: Props) {
  return (
    <>
      <ShippingInfoSection res={res} />
    </>
  );
}

export default Success;