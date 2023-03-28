import React from 'react';
import { TradeItem } from '@type/trade';
import { ResType as TradeType } from '@api/query/trade/useTradeQuery';
import PhotoInfo from '@component/photocard/info/PhotoInfo';
import TradeInfo from '@component/trade/info/TradeInfo';
import TradeInfoCard from '@component/trade/TradeInfoCard';
import TradeWantCard from '@component/trade/TradeWantCard';
import TradeRemove from './content/TradeRemove';
import ButtonSection from './content/ButtonSection';

interface Props {
  trade: TradeItem;
}

function Success({ trade }: Props) {
  return (
    <>
      <PhotoInfo {...trade.voucher} styles={{ margin: '0 auto 5em auto' }} />
      <TradeWantCard wantcards={trade.wantcards} />
      {/* <TradeRemove trade={trade} /> */}
      {/* <ButtonSection trade={trade} /> */}
    </>
  );
}

export default Success;
