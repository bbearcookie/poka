import React from 'react';
import * as voucherAPI from '@api/voucherAPI';
import VoucherInfoCard from '@component/card/VoucherInfoCard';
import PhotoInfoCard from '@component/photocard/detail/PhotoInfoCard';
import Button from '@component/form/Button';

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
      <VoucherInfoCard voucher={voucher} showAdminInfo={false} />
      <section className="button-section">
        
      </section>
      <Button>하하버튼</Button>
    </>
  );
}

Success.defaultProps = SuccessDefaultProps;
export default Success;