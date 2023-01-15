import React, { useState, useCallback } from 'react';
import { useAppSelector } from '@app/redux/reduxHooks';
import useTradeExchangeQuery from '@api/query/trade/useTradeExchangeQuery';
import { ResType as TradeType } from '@api/query/trade/useTradeQuery';
import { faArrowsSpin } from '@fortawesome/free-solid-svg-icons';
import VoucherCard from '@component/photocard/voucher/VoucherCard';
import Button from '@component/form/Button';
import Input from '@component/form/Input';
import useModal from '@hook/useModal';
import ConfirmModal from '@component/modal/ConfirmModal';

interface Props {
  trade: TradeType;
}
const DefaultProps = {};

function Exchange({ trade }: Props) {
  const auth = useAppSelector(state => state.auth);
  const [select, setSelect] = useState<{ [x: number]: boolean }>({ });
  const modal = useModal();

  const { data: exchange, status } = useTradeExchangeQuery(trade.trade_id, {
    enabled: function() {
      if (trade.trade_id === 0) return false;
      if (trade.user_id === auth.user_id) return false;
      return true;
    }(),
    onSuccess: (data) => {
      setSelect(Object.fromEntries(data.vouchers.map(item => [item.voucher_id, false])));
    }
  });

  // 모달 열기
  const openModal = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    modal.open();
  }, [modal]);

  // 선택 변경
  const onChangeSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const voucherId = Number(e.target.value);
    setSelect({ ...select, [voucherId]: !select[voucherId] });
  }, [select]);

  // 교환
  const handleExchange = useCallback(() => {
    console.log(select);
  }, [select]);

  return (
    <>
      <Button
        disabled={status === 'success' && exchange.vouchers.length >= trade.amount ? false : true}
        leftIcon={faArrowsSpin}
        onClick={openModal}
        styles={{
          theme: "pink",
          width: "7em",
          iconMargin: "1em"
        }}
      >교환</Button>

      <ConfirmModal
        hook={modal}
        titleName="교환할 소유권 선택"
        confirmText="교환"
        confirmButtonTheme="pink"
        cardStyles={{ maxWidth: "100vh" }}
        handleConfirm={handleExchange}
      >
        <section className="photo-section">
          {exchange?.vouchers.map(voucher => 
          <VoucherCard
            key={voucher.voucher_id}
            voucherId={voucher.voucher_id}
            photoName={voucher.name}
            groupName={voucher.group_name}
            memberName={voucher.member_name}
            imageName={voucher.image_name}
            username={voucher.username}
            voucherState={voucher.state}
            showOwner={false}
            styles={{ flexDirection: "row" }}
          >
            <div className="space" />
            <input
              type="checkbox"
              value={voucher.voucher_id}
              onChange={onChangeSelect}
            />
          </VoucherCard>)}
        </section>
        <p className="description">가지고 있는 포토카드 중에서 상대방과 교환하려고 하는 것을 {trade.amount}개 선택해주세요.</p>
      </ConfirmModal>
    </>
  );
}

export default Exchange;