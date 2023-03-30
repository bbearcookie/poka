import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { LocationState } from '@type/react-router';
import PhotoInfo from '@component/photocard/info/PhotoInfo';
import TradeInfo from '@component/trade/info/TradeInfo';
import useTradeQuery from '@api/query/trade/useTradeQuery';
import BackLabel from '@component/label/BackLabel';
import TradeRemove from './content/TradeRemove';
import ButtonSection from './content/ButtonSection';
import './Index.scss';

function Index() {
  const tradeId = Number(useParams().tradeId);
  const location = useLocation();
  const prev = (location.state as LocationState | null)?.prev;
  const { data: trade, status } = useTradeQuery(tradeId);

  return (
    <main className="UserTradeDetailPage">
      {prev && (
        <BackLabel to={prev.url} styles={{ marginBottom: '2em' }}>
          {prev.text}
        </BackLabel>
      )}

      {status === 'success' && (
        <>
          <PhotoInfo {...trade.voucher} styles={{ margin: '0 auto 5em auto' }} />
          <TradeInfo {...trade} tradeState={trade.state} />
          <TradeRemove trade={trade} />
          <ButtonSection trade={trade} />
        </>
      )}
    </main>
  );
}

export default Index;
