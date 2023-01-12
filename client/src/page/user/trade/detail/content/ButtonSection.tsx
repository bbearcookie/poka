import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@app/redux/reduxHooks';
import { ResType as TradeType } from '@api/query/trade/useTradeQuery';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Button from '@component/form/Button';

interface Props {
  trade: TradeType;
}
const DefaultProps = {};

function ButtonSection({ trade }: Props) {
  const auth = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  const onClickEdit = useCallback(() => {
    navigate(`/trade/editor/${trade.trade_id}`);
  }, [navigate, trade]);

  return (
    <section className="button-section">
      {trade.state === "trading" && trade.user_id === auth.user_id &&
      <Button
        leftIcon={faEdit}
        onClick={onClickEdit}
        styles={{
          theme: "primary",
          width: "7em",
          iconMargin: "1em"
        }}
      >수정</Button>}
      {trade.state === "trading" && trade.user_id !== auth.user_id && <Button styles={{ theme: 'pink' }}>교환</Button>}
    </section>
  );
}

export default ButtonSection;