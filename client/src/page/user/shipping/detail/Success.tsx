import React from 'react';
import { ResType } from '@api/query/shipping/useShippingRequestQuery';
import ShippingInfoSection from './content/ShippingInfoSection';
import VoucherSection from './content/VoucherSection';
import ButtonSection from './content/ButtonSection';
import ShippingRequestInfo from '@component/shipping/request/ShippingRequestInfo';

interface Props {
  res: ResType;
}

function Success({ res }: Props) {
  return (
    <>
      <ShippingRequestInfo shipping={res.shipping} cardStyles={{ marginBottom: "5em" }} />
      {/* <ShippingInfoSection res={res} /> */}
      <VoucherSection res={res} />
      <ButtonSection res={res} />
    </>
  );
}

export default Success;