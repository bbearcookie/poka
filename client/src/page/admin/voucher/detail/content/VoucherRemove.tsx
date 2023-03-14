import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '@util/request';
import useDeleteVoucher from '@api/mutation/voucher/useDeleteVoucher';
import useModal from '@hook/useModal';
import RemoveCard from '@component/card/RemoveCard';
import ConfirmModal from '@component/modal/ConfirmModal';

interface Props {
  voucherId: number;
}

function VoucherRemove({ voucherId }: Props) {
  const removeModal = useModal();
  const navigate = useNavigate();

  // 데이터 삭제 요청
  const deleteMutation = useDeleteVoucher(
    voucherId,
    (res) => navigate('/admin/voucher/list'),
    (err) => removeModal.setErrorMessage(getErrorMessage(err))
  );

  // 소유권 삭제
  const handleRemove = useCallback(() => {
    deleteMutation.mutate({ voucherId });
  }, [deleteMutation, voucherId]);

  return (
    <section>
      <RemoveCard
        titleText="소유권 삭제"
        onClick={(e) => { e.stopPropagation(); removeModal.open(); }}
      >
        <p className="description">관리자가 소유권을 잘못 발급 했을 경우를 대비한 삭제 기능입니다.</p>
        <p className="description">이 기능을 사용할 경우는 드물며, 해당 소유권을 삭제하면 연관된 교환글도 모두 지워지니 신중히 삭제해주세요.</p>
      </RemoveCard>

      <ConfirmModal
        hook={removeModal}
        cardStyles={{ maxWidth: "100vh" }}
        titleName="소유권 삭제"
        confirmText="삭제"
        handleConfirm={handleRemove}
      >
        <p className="text">이 소유권을 삭제하면 연관된 교환글도 함께 지워져요.</p>
        <p className="text">정말로 이 소유권을 삭제하시겠어요?</p>
      </ConfirmModal>
    </section>
  );
}

export default VoucherRemove;