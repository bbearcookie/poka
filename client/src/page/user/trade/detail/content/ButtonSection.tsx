import React from 'react';
import { useAppSelector } from '@app/redux/reduxHooks';
import { TradeItem } from '@type/trade';
import Edit from './Edit';
import Exchange from './Exchange';

interface Props {
  trade: TradeItem;
}

function ButtonSection({ trade }: Props) {
  const { userId } = useAppSelector(state => state.auth);

  return (
    <div className="button-section">
      {trade.state === 'trading' &&
      <>
        {trade.author.userId === userId && <Edit trade={trade} />}
        {trade.author.userId !== userId && <Exchange trade={trade} />}
      </>}
    </div>
  );
}

export default ButtonSection;