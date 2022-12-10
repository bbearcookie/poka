import React from 'react';
import * as voucherAPI from '@api/voucherAPI';
import VoucherInfoCard from '@component/card/VoucherInfoCard';
import PhotoInfoCard from '@component/photocard/detail/PhotoInfoCard';
import Button from '@component/form/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes, faTruckFast } from '@fortawesome/free-solid-svg-icons';

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
        <Button
          leftIcon={faShareNodes}
          styles={{
            theme: "primary",
            iconMargin: "3em"
          }}
        >교환글 작성하기</Button>
        <Button
          leftIcon={faTruckFast}
          styles={{
            theme: "pink",
            iconMargin: "3.6em"
          }}
        >배송 요청하기</Button>
      </section>
    </>
  );
}

Success.defaultProps = SuccessDefaultProps;
export default Success;