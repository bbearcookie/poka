import React from 'react';
import { useAppSelector } from '@app/redux/reduxHooks';
import { ResType as TradeType } from '@api/query/trade/useTradeQuery';
import Button from '@component/form/Button';

interface Props {
  trade: TradeType;
}
const DefaultProps = {};

function ButtonSection({ trade }: Props) {
  const auth = useAppSelector(state => state.auth);

  return (
    <section className="button-section">
      {trade.state === 'trading' && trade.user_id === auth.user_id && <Button styles={{ theme: 'primary' }}>수정하기</Button>}
      {trade.state === 'trading' && trade.user_id !== auth.user_id && <Button styles={{ theme: 'pink' }}>교환하기</Button>}
    </section>
  );
}

export default ButtonSection;