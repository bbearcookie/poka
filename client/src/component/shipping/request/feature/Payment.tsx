import React, { useCallback } from 'react';
import useCheckShippingPayment from '@api/mutation/shipping/payment/useCheckShippingPayment';
import { toast } from 'react-toastify';
import { ResType } from '@api/query/shipping/useShippingRequestQuery';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import Button from '@component/form/Button';

interface Props {
  res: ResType;
}

// 결제 기능
function Payment({ res }: Props) {
  const checkMutation = useCheckShippingPayment();

  // 결제 하기
  const handlePayment = useCallback(() => {
    window.IMP?.request_pay({
      amount: res.shipping.amount,
      buyer_tel: res.shipping.contact,
      merchant_uid: res.shipping.merchantUID,
      buyer_email: '',
      buyer_name: res.shipping.recipient,
      name: '배송비',
    }, rsp => {

      // 결제 성공시 백엔드에 결제 결과 검증 요청
      if (rsp.success) {
        checkMutation.mutate({
          requestId: res.shipping.requestId,
          body: { impUID: rsp.imp_uid || '' }
        });
      // 결제 실패시 원인 출력
      } else {
        console.error(`결제 실패(${rsp.error_code}) ${rsp.error_msg}`);
        if (rsp.error_code) toast.error(`결제 실패: ${rsp.error_msg}`, { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
      }
    });
  }, [res, checkMutation]);

  return (
    <Button
      leftIcon={faCoins}
      styles={{
        theme: "primary",
        width: "7em",
        iconMargin: "1em"
      }}
      onClick={handlePayment}
    >결제</Button>
  );
}

export default Payment;