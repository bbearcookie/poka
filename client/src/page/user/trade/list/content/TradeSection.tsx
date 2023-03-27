import React, { Fragment, useCallback } from 'react';
import { useUpdateEffect } from 'react-use';
import { useQueryClient } from '@tanstack/react-query';
import * as queryKey from '@api/queryKey';
import useTradesQuery from '@api/query/trade/useTradesQuery';
import NextPageFetcher from '@component/list/content/NextPageFetcher';
import SkeletonTradeCard from '@component/trade/SkeletonTradeCard';
import TradeCard from '@component/trade/TradeCard';
import { useAppSelector } from '@app/redux/reduxHooks';

interface Props {
  groupId: number;
  memberId: number;
}

function TradeSection({ groupId, memberId }: Props) {
  const { userId } = useAppSelector(state => state.auth);
  const queryClient = useQueryClient();

  const {
    data: trades,
    refetch,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useTradesQuery(
    {
      groupId,
      memberId,
      excludeUserId: userId,
      state: 'trading',
    },
    {
      enabled: userId !== 0,
    }
  );

  // 검색 필터 변경시 데이터 리패칭
  const handleRefetch = useCallback(async () => {
    queryClient.removeQueries(queryKey.tradeKeys.all);
    refetch();
  }, [queryClient, refetch]);
  useUpdateEffect(() => {
    handleRefetch();
  }, [groupId, memberId]);

  return (
    <section className="trade-section">
      {trades?.pages.map((page, pageIdx) => (
        <Fragment key={pageIdx}>
          {page.trades.map(item => (
            <TradeCard key={item.tradeId} trade={item} />
          ))}
        </Fragment>
      ))}

      {isFetching && Array.from({ length: 20 }).map((_, idx) => <SkeletonTradeCard key={idx} />)}

      <NextPageFetcher hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </section>
  );
}

export default TradeSection;
