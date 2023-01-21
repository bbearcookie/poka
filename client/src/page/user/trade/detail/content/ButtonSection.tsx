import React from 'react';
import { useAppSelector } from '@app/redux/reduxHooks';
import { ResType as TradeType } from '@api/query/trade/useTradeQuery';
import Edit from './Edit';
import Exchange from './Exchange';

interface Props {
  trade: TradeType;
}
const DefaultProps = {};

function ButtonSection({ trade }: Props) {
  const auth = useAppSelector(state => state.auth);

  return (
    <div className="button-section">
      {trade.state === 'trading' &&
      <>
        {trade.user_id === auth.user_id && <Edit trade={trade} />}
        {trade.user_id !== auth.user_id && <Exchange trade={trade} />}
      </>}
    </div>
  );
}

export default ButtonSection;