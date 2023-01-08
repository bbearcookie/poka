import React, { Fragment, useCallback } from 'react';
import { useUpdateEffect } from 'react-use';
import { useQueryClient } from '@tanstack/react-query';
import * as queryKey from '@api/queryKey';
import useTradesQuery from '@api/query/trade/useTradesQuery';
import NextPageFetcher from '@component/list/NextPageFetcher';
import SkeletonTradeCard from '@component/trade/skeleton/SkeletonTradeCard';
import TradeCard from '@component/trade/TradeCard';
import { State, Action } from '../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}
const DefaultProps = {};

function TradeSection({ state, dispatch }: Props) {
  const queryClient = useQueryClient();

  const { data: trades, refetch, isFetching, fetchNextPage, hasNextPage }
  = useTradesQuery(state.select);

  // 검색 필터 변경시 데이터 리패칭
  const handleRefetch = useCallback(async () => {
    queryClient.removeQueries(queryKey.tradeKeys.all);
    refetch();
  }, [queryClient, refetch]);
  useUpdateEffect(() => {
    handleRefetch();
  }, [state.select]);

  return (
    <section className="trade-section">

      {trades?.pages.map((page, pageIdx) =>
      <Fragment key={pageIdx}>
        {page.trades.map(item =>
          <TradeCard key={item.trade_id} trade={item} />
        )}
      </Fragment>)}

      {isFetching && Array.from({length: 20}).map((_, idx) => (
        <SkeletonTradeCard key={idx} />
      ))}

      <NextPageFetcher hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </section>
  );
}

export default TradeSection;