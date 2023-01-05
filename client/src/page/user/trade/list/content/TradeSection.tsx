import React from 'react';
import TradeCard from '@component/trade/TradeCard';
import { State, Action } from '../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}
const DefaultProps = {};

function TradeSection({ state, dispatch }: Props) {
  return (
    <section className="trade-section">
      <TradeCard />
      <TradeCard />
      <TradeCard />
      <TradeCard />
      <TradeCard />
      <TradeCard />
      <TradeCard />
    </section>
  );
}

export default TradeSection;