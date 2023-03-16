import React from 'react';
import { ResType } from '@api/query/shipping/useShippingRequestQuery';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ShippingRequestInfo from '@component/shipping/request/ShippingRequestInfo';
import RequestVoucherInfo from '@component/shipping/request/RequestVoucherInfo';
import Remove from '@component/shipping/request/feature/Remove';
import Approve from '@component/shipping/request/feature/Approve';
import { ButtonSection } from '@component/form/_styles';

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
        {res.shipping.request.state !== "shipped" && <Approve res={res} />}
        {res.shipping.request.state !== "shipped" && <Remove res={res} redirectTo="/admin/shipping/list" />}
      </ButtonSection>
    </>
  );
}

export default Success;