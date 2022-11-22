import React from 'react';
import * as voucherAPI from '@api/voucherAPI';
import PhotoInfoCard from '@component/photocard/detail/PhotoInfoCard';
import VoucherInfo from './content/VoucherInfo';
import VoucherRemove from './content/VoucherRemove';

interface SuccessProps {
  voucher: typeof voucherAPI.getVoucherDetail.resType;
  children?: React.ReactNode;
}
const SuccessDefaultProps = {};

function Success({ voucher, children }: SuccessProps & typeof SuccessDefaultProps) {
  if (!voucher) return <></>;

  return (
    <>
      <PhotoInfoCard photo={voucher} />
      <VoucherInfo voucher={voucher} />
      <VoucherRemove voucher={voucher} voucherId={voucher.voucher_id} />
    </>
  );
}

Success.defaultProps = SuccessDefaultProps;
export default Success;