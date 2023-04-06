import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useDeleteShippingRequest from '@api/mutation/shipping/request/useDeleteShippingRequest';
import useRefundShippingPayment from '@api/mutation/shipping/payment/useRefundShippingPayment';
import { ResType } from '@api/query/shipping/useShippingRequestQuery';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { getErrorMessage } from '@util/request';
import Button from '@component/form/Button';
import ConfirmModal from '@component/modal/ConfirmModal';
import useModal from '@component/modal/useModal';

interface Props {
  res: ResType;
  redirectTo: string;
}

// 배송 요청 삭제 기능
function Remove({ res, redirectTo }: Props) {
  const modal = useModal();
  const navigate = useNavigate();

  // 삭제 요청
  const deleteMutation = useDeleteShippingRequest(
    res.shipping.requestId,
    res => navigate(redirectTo),
    err => {
      modal.setErrorMessage(getErrorMessage(err));
    }
  );

  // 환불 요청
  const refundMutation = useRefundShippingPayment(res.shipping.requestId, res =>
    deleteMutation.mutate({})
  );

  // 모달 열기
  const openModal = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      modal.open();
    },
    [modal]
  );

  // 배송요청 취소
  const onCancel = useCallback(() => {
    // 아직 결제하지 않은 경우 바로 삭제
    if (res.shipping.payment.state === 'waiting') deleteMutation.mutate({});
    // 결제한 경우 환불 후 삭제
    else refundMutation.mutate({});
  }, [res, deleteMutation, refundMutation]);

  return (
    <>
      <Button
        leftIcon={faClose}
        styles={{
          theme: 'danger',
          width: '7em',
          iconMargin: '1em',
        }}
        onClick={openModal}
      >
        삭제
      </Button>

      <ConfirmModal
        hook={modal}
        title="배송요청 삭제"
        confirm={{ text: '예', buttonTheme: 'danger', onClick: onCancel }}
        cancel={{ text: '아니오' }}
      >
        <p className="text">관리자에게 요청한 배송요청을 삭제하고 취소합니다.</p>
        <p className="text">아직 관리자가 배송처리하지 않은 경우에만 가능하며,</p>
        <p className="text">요청한 소유권들은 다시 교환 가능한 상태가 됩니다.</p>
        {res.shipping.payment.state !== 'waiting' && (
          <p className="text">
            <br />
            결제된 배송비는 환불처리 됩니다.
          </p>
        )}
      </ConfirmModal>
    </>
  );
}

export default Remove;
