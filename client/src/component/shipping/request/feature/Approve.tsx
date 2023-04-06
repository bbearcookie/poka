import React, { useCallback } from 'react';
import styled from 'styled-components';
import useApproveShippingRequest from '@api/mutation/shipping/request/useApproveShippingRequest';
import { ResType } from '@api/query/shipping/useShippingRequestQuery';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import ConfirmModal from '@component/modal/ConfirmModal';
import useModal from '@component/modal/useModal';
import Button from '@component/form/Button';

interface Props {
  res: ResType;
}

// 관리자의 배송 완료 처리 기능
function Approve({ res }: Props) {
  const modal = useModal();
  const approveMutation = useApproveShippingRequest(res.shipping.requestId);

  // 배송 완료 처리
  const handleApprove = useCallback(() => {
    approveMutation.mutate({});
    modal.close();
  }, [approveMutation, modal]);

  // 모달 열기
  const openModal = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    modal.open();
  }, [modal]);

  return (
    <>
      <Button
        leftIcon={faTruckFast}
        styles={{
          theme: "primary",
          width: "10em",
          iconMargin: "1em"
        }}
        onClick={openModal}
        disabled={res.shipping.payment.state !== 'paid'}
      >발송 완료</Button>

      <ConfirmModal
        hook={modal}
        title="발송 완료 처리"
        confirm={{ buttonTheme: "primary", onClick: handleApprove }}
      >
        <p className="text">배송 요청의 상태를 완료 상태로 변경합니다.</p>
        <p className="text">요청한 소유권들은 배송 완료 상태가 되어서 더 이상 <RedLabel>사용할 수 없습니다.</RedLabel></p>
      </ConfirmModal>
    </>
  );
}

export default Approve;

const RedLabel = styled.b`
  color: red;
`