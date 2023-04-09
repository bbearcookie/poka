import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TradeItem } from '@type/trade';
import { getErrorMessage } from '@util/request';
import useDeleteTrade from '@api/mutation/trade/useDeleteTrade';
import { useAppSelector } from '@app/redux/store';
import useModal from '@component/modal/useModal';
import ConfirmModal from '@component/modal/ConfirmModal';
import RemoveCard from '@component/card/RemoveCard';

interface Props {
  trade: TradeItem;
}

function TradeRemove({ trade }: Props) {
  const { userId } = useAppSelector(state => state.auth);
  const removeModal = useModal();
  const navigate = useNavigate();

  // 데이터 삭제 요청
  const deleteMutation = useDeleteTrade(
    trade.tradeId,
    res => navigate('/trade/list'),
    err => removeModal.setErrorMessage(getErrorMessage(err))
  );

  // 모달 열기
  const openModal = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      removeModal.open();
    },
    [removeModal]
  );

  // 교환글 삭제
  const removeTrade = useCallback(() => {
    deleteMutation.mutate({ tradeId: trade.tradeId });
  }, [deleteMutation, trade]);

  return (
    <>
      {trade.state === 'trading' && trade.author.userId === userId && (
        <RemoveCard titleText="교환글 삭제" onClick={openModal} css={{ marginBottom: '5em' }}>
          <p className="description">아직 교환이 성사되지 않은 경우에만 삭제 가능합니다.</p>
        </RemoveCard>
      )}

      <ConfirmModal
        hook={removeModal}
        title="교환글 삭제"
        confirm={{ text: '삭제', buttonTheme: 'danger', onClick: removeTrade }}
      >
        <p className="text">
          교환글을 삭제하면 등록한 소유권의 상태는 다시 교환 가능한 상태로 바뀌어요.
        </p>
        <p className="text">정말로 교환글을 삭제하시겠어요?</p>
      </ConfirmModal>
    </>
  );
}

export default TradeRemove;
