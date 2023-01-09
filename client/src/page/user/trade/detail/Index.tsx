import React from 'react';
import { useParams } from 'react-router-dom';
import useTradeQuery from '@api/query/trade/useTradeQuery';
import BackLabel from '@component/label/BackLabel';
import Success from './Success';
import './Index.scss';

interface Props {

}
const DefaultProps = {};

function Index({  }: Props) {
  const { tradeId } = useParams() as any;
  const { data: trade, status } = useTradeQuery(tradeId);

  return (
    <div className="UserTradeDetailPage">
      <BackLabel to="/trade/list" styles={{ marginBottom: "2em" }}>교환글 목록</BackLabel>
      {status === 'success' && <Success trade={trade} />}
    </div>
  );
}

export default Index;