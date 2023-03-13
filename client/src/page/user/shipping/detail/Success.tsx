import React from 'react';
import { ResType } from '@api/query/shipping/useShippingRequestQuery';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ShippingRequestInfo from '@component/shipping/request/ShippingRequestInfo';
import RequestVoucherInfo from '@component/shipping/request/RequestVoucherInfo';
import { ButtonSection } from '@component/form/_styles';
import Payment from './content/Payment';
import Remove from './content/Remove';

interface Props {
  res: ResType;
}

function Success({ res }: Props) {
  return (
    <>
      <ShippingRequestInfo
        shipping={res.shipping}
        cardStyles={{ marginBottom: "5em" }}
      />
      <RequestVoucherInfo
        vouchers={res.vouchers}
        icon={{ svg: faArrowRight, tooltip: "상세 보기" }}
        cardStyles={{ marginBottom: "5em" }}
      />
      <ButtonSection>
        {res.shipping.paymentState === "waiting" && <Payment res={res} />}
        {res.shipping.requestState !== "shipped" && <Remove res={res} />}
      </ButtonSection>
    </>
  );
}

export default Success;