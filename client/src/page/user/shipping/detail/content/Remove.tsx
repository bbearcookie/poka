import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useDeleteShippingRequest from '@api/mutation/shipping/useDeleteShippingRequest';
import useRefundShippingPayment from '@api/mutation/shipping/useRefundShippingPayment';
import { ResType } from '@api/query/shipping/useShippingRequestQuery';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { getErrorMessage } from '@util/request';
import Button from '@component/form/Button';
import ConfirmModal from '@component/modal/ConfirmModal';
import useModal from '@hook/useModal';

interface Props {
  res: ResType;
}

function Remove({ res }: Props) {
  const modal = useModal();
  const navigate = useNavigate();

  // 삭제 요청
  const deleteMutation = useDeleteShippingRequest(res.shipping.requestId, res.vouchers.map(e => e.voucherId),
    (res) => navigate('/shipping/list'),
    (err) => {
      modal.setErrorMessage(getErrorMessage(err));
    }
  );

  // 환불 요청
  const refundMutation = useRefundShippingPayment(
    (r) => deleteMutation.mutate({ requestId: res.shipping.requestId })
  );

  // 모달 열기
  const openModal = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    modal.open();
  }, [modal]);

  // 배송요청 취소
  const onCancel = useCallback(() => {
    // 아직 결제하지 않은 경우 바로 삭제
    if (res.shipping.paymentState === 'waiting')
      deleteMutation.mutate({ requestId: res.shipping.requestId });
    // 결제한 경우 환불 후 삭제
    else
      refundMutation.mutate({ requestId: res.shipping.requestId });
  }, [res, deleteMutation, refundMutation]);

  return (
    <>
      <Button
        leftIcon={faClose}
        styles={{
          theme: "danger",
          width: "7em",
          iconMargin: "1em"
        }}
        onClick={openModal}
      >취소</Button>

      <ConfirmModal
        hook={modal}
        titleName="배송요청 취소"
        confirmText="예"
        cancelText="아니오"
        cardStyles={{ maxWidth: "100vh" }}
        handleConfirm={onCancel}
      >
        <p className="text">관리자에게 요청했던 배송요청을 삭제하고 취소합니다.</p>
        <p className="text">아직 관리자가 배송처리하지 않은 경우에만 가능하며,</p>
        <p className="text">요청한 소유권들은 다시 교환 가능한 상태가 됩니다.</p>
        {res.shipping.paymentState !== 'waiting' && <p className="text"><br/>결제된 배송비는 환불처리 됩니다.</p>}
      </ConfirmModal>
    </>
  );
}

export default Remove;