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
  const prevURI = (location.state as LocationState | null)?.prevURI;
  const { data: trade, status } = useTradeQuery(tradeId);

  return (
    <main className="UserTradeDetailPage">
      <Back prevURI={prevURI} />
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

function Back({ prevURI }: { prevURI?: string }) {
  if (prevURI) {
    if (/voucher/.test(prevURI))
      return (
        <BackLabel to={prevURI} styles={{ marginBottom: '2em' }}>
          소유권 상세정보
        </BackLabel>
      );
  }

  return (
    <BackLabel to="/trade/list" styles={{ marginBottom: '2em' }}>
      교환글 목록
    </BackLabel>
  );
}

export default Index;
