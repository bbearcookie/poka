import React, { useCallback } from 'react';
import { ResType as TradeType } from '@api/query/trade/useTradeQuery';
import { useAppSelector } from '@app/redux/reduxHooks';
import useModal from '@hook/useModal';
import ConfirmModal from '@component/modal/ConfirmModal';
import RemoveCard from '@component/card/RemoveCard';

interface Props {
  trade: TradeType;
}
const DefaultProps = {};

function TradeRemove({ trade }: Props) {
  const auth = useAppSelector(state => state.auth);
  const removeModal = useModal();

  const openModal = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    removeModal.open();
  }, [removeModal]);
  
  return (
    <>
      {trade.state === 'trading' && trade.user_id === auth.user_id &&
      <RemoveCard
        titleText="교환글 삭제"
        cardStyles={{ marginBottom: "5em" }}
        onClick={openModal}
      >
        <p className="description">아직 교환이 성사되지 않은 경우에만 삭제 가능합니다.</p>
      </RemoveCard>}

      <ConfirmModal
        hook={removeModal}
        titleName="교환글 삭제"
        confirmText="삭제"
        cardStyles={{ maxWidth: "100vh" }}
      >
        <p className="text">교환글을 삭제하면 등록한 소유권의 상태는 다시 교환 가능한 상태로 바뀌어요.</p>
        <p className="text">정말로 교환글을 삭제하시겠어요?</p>
      </ConfirmModal>
    </>
  );
}

export default TradeRemove;