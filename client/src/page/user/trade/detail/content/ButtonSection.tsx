import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@app/redux/reduxHooks';
import useTradeExchangeableQuery from '@api/query/trade/useTradeExchangeableQuery';
import { ResType as TradeType } from '@api/query/trade/useTradeQuery';
import { faEdit, faArrowsSpin } from '@fortawesome/free-solid-svg-icons';
import Button from '@component/form/Button';

interface Props {
  trade: TradeType;
}
const DefaultProps = {};

function ButtonSection({ trade }: Props) {
  const auth = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const exchangeable = useTradeExchangeableQuery(trade.trade_id, {
    enabled: function() {
      if (trade.trade_id === 0) return false;
      if (trade.user_id === auth.user_id) return false;
      return true;
    }()
  });

  const onClickEdit = useCallback(() => {
    navigate(`/trade/editor/${trade.trade_id}`);
  }, [navigate, trade]);

  const onClickTrade = useCallback(() => {
    console.log(`TODO: ${trade.trade_id} 교환하기`);
  }, [trade]);

  return (
    <section className="button-section">
      {trade.state === 'trading' &&
      <>
        {trade.user_id === auth.user_id &&
        <Button
          leftIcon={faEdit}
          onClick={onClickEdit}
          styles={{
            theme: "primary",
            width: "7em",
            iconMargin: "1em"
          }}
        >수정</Button>}

        {trade.user_id !== auth.user_id &&
        <Button
          disabled={exchangeable.status === 'success' && exchangeable.data.exchangeable === true ? false : true}
          leftIcon={faArrowsSpin}
          onClick={onClickTrade}
          styles={{
            theme: "pink",
            width: "7em",
            iconMargin: "1em"
          }}
        >교환</Button>}
      </>}
    </section>
  );
}

export default ButtonSection;