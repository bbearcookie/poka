import React, { useCallback } from 'react';
import useApproveShippingRequest from '@api/mutation/shipping/request/useApproveShippingRequest';
import { ResType } from '@api/query/shipping/useShippingRequestQuery';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import ConfirmModal from '@component/modal/ConfirmModal';
import useModal from '@component/modal/useModal';
import Button from '@component/form/button/Button';

interface Props {
  res: ResType;
}

// 관리자의 발송 완료 처리 기능
function Approve({ res }: Props) {
  const modal = useModal();
  const approveMutation = useApproveShippingRequest(res.shipping.requestId);

  // 발송 완료 처리
  const handleApprove = useCallback(() => {
    approveMutation.mutate();
    modal.close();
  }, [approveMutation, modal]);

  // 모달 열기
  const openModal = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      modal.open();
    },
    [modal]
  );

  return (
    <>
      <Button
        buttonTheme="primary"
        leftIcon={faTruckFast}
        iconMargin="1em"
        onClick={openModal}
        disabled={res.shipping.payment.state !== 'paid'}
      >
        발송 처리
      </Button>

      <ConfirmModal hook={modal} title="발송 처리" confirm={{ buttonTheme: 'primary', onClick: handleApprove }}>
        <p className="text">
          배송 요청의 상태를 <b>발송 완료</b> 상태로 변경합니다.
        </p>
        <p className="text">
          사용자가 요청한 소유권들은 발송 완료 상태가 되고, 더 이상 <b css={{ color: 'red' }}>교환할 수 없는 상태</b>가
          됩니다.
        </p>
      </ConfirmModal>
    </>
  );
}

export default Approve;
