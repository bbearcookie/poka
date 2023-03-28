import React, { useState, useCallback } from 'react';
import { useAppSelector } from '@app/redux/reduxHooks';
import useTradeExchangeQuery from '@api/query/trade/useTradeExchangeQuery';
import useExchangeTrade from '@api/mutation/trade/useExchangeTrade';
import { ResType as TradeType } from '@api/query/trade/useTradeQuery';
import { faArrowsSpin } from '@fortawesome/free-solid-svg-icons';
import { getErrorMessage } from '@util/request';
import VoucherItem from '@component/voucher/item/VoucherItem';
import Button from '@component/form/Button';
import useModal from '@hook/useModal';
import ConfirmModal from '@component/modal/ConfirmModal';

interface Props {
  trade: TradeType;
}

function Exchange({ trade }: Props) {
  const { userId } = useAppSelector((state) => state.auth);
  const [select, setSelect] = useState<{ [x: number]: boolean }>({});
  const modal = useModal();

  const { data: exchange, status } = useTradeExchangeQuery(trade.tradeId, {
    enabled: (function () {
      if (trade.tradeId === 0) return false;
      if (trade.author.userId === userId) return false;
      return true;
    })(),
    onSuccess: (data) => {
      setSelect(
        Object.fromEntries(data.vouchers.map((item) => [item.voucherId, false]))
      );
    },
  });

  const postMutation = useExchangeTrade(
    trade.tradeId,
    (res) => {
      modal.close();
    },
    (err) => {
      modal.setErrorMessage(getErrorMessage(err));
    }
  );

  // 모달 열기
  const openModal = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      modal.open();
    },
    [modal]
  );

  // 선택 변경
  const onChangeSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const voucherId = Number(e.target.value);
      setSelect({ ...select, [voucherId]: e.target.checked });
      modal.setErrorMessage('');
    },
    [select, modal]
  );

  // 교환
  const handleExchange = useCallback(() => {
    const voucherIds = Object.entries(select)
      .filter((item) => item[1])
      .map((item) => Number(item[0]));
    postMutation.mutate({ voucherIds });
  }, [select, postMutation]);

  return (
    <>
      <Button
        disabled={
          status === 'success' && exchange.vouchers.length >= trade.amount
            ? false
            : true
        }
        leftIcon={faArrowsSpin}
        onClick={openModal}
        styles={{
          theme: 'pink',
          width: '7em',
          iconMargin: '1em',
        }}
      >
        교환
      </Button>

      <ConfirmModal
        hook={modal}
        titleName="교환할 소유권 선택"
        confirmText="교환"
        confirmButtonTheme="pink"
        cardStyles={{ maxWidth: '100vh' }}
        handleConfirm={handleExchange}
      >
        <section className="photo-section">
          {exchange?.vouchers.map((v) => (
            <VoucherItem
              {...v}
              key={v.voucherId}
              voucherId={v.voucherId}
              voucherState={v.state}
              showOwner={false}
              item={
                <input
                  type="checkbox"
                  value={v.voucherId}
                  checked={select[v.voucherId] ? true : false}
                  onChange={onChangeSelect}
                  readOnly
                />
              }
            />
          ))}
        </section>
        <p className="description">
          가지고 있는 포토카드 중에서 상대방과 교환하려고 하는 것을{' '}
          {trade.amount}개 선택해주세요.
        </p>
      </ConfirmModal>
    </>
  );
}

export default Exchange;
