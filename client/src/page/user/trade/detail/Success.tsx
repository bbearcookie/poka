import React from 'react';
import { ResType as TradeType } from '@api/query/trade/useTradeQuery';
import PhotoInfo from '@component/photocard/new/info/PhotoInfo';
import TradeInfoCard from '@component/trade/TradeInfoCard';
import TradeWantCard from '@component/trade/TradeWantCard';
import TradeRemove from './content/TradeRemove';
import ButtonSection from './content/ButtonSection';

interface Props {
  trade: TradeType;
}

function Success({ trade }: Props) {
  return (
    <>
      <PhotoInfo {...trade.photo} styles={{ margin: '0 auto 5em auto' }} />
      <TradeInfoCard trade={trade} />
      <TradeWantCard wantcards={trade.wantcards} />
      <TradeRemove trade={trade} />
      <ButtonSection trade={trade} />
    </>
  );
}

export default Success;
