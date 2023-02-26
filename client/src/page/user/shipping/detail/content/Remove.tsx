import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useDeleteShippingRequest from '@api/mutation/shipping/useDeleteShippingRequest';
import { ResType } from '@api/query/shipping/useShippingRequestQuery';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { getErrorMessage } from '@util/request';
import Button from '@component/form/Button';
import ConfirmModal from '@component/modal/ConfirmModal';
import useModal from '@hook/useModal';

interface Props {
  res: ResType;
}
const DefaultProps = {};

function Remove({ res }: Props) {
  const modal = useModal();
  const navigate = useNavigate();

  const deleteMutation = useDeleteShippingRequest(res.shipping.requestId, res.vouchers.map(e => e.voucherId),
    (res) => navigate('/shipping/list'),
    (err) => {
      modal.setErrorMessage(getErrorMessage(err));
    });

  // 모달 열기
  const openModal = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    modal.open();
  }, [modal]);

  // 배송요청 취소
  const handleRemove = useCallback(() => {
    deleteMutation.mutate({ requestId: res.shipping.requestId });
  }, [res, deleteMutation]);

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
        cardStyles={{ maxWidth: "100vh" }}
        handleConfirm={handleRemove}
      >
        <p className="text">관리자에게 요청했던 배송요청을 삭제하고 취소합니다.</p>
        <p className="text">아직 관리자가 배송처리하지 않은 경우에만 가능하며,</p>
        <p className="text">요청한 소유권들은 다시 교환 가능한 상태가 됩니다.</p>
      </ConfirmModal>
    </>
  );
}

export default Remove;