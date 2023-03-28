import { Fragment, useCallback } from 'react';
import { useUpdateEffect } from 'react-use';
import { useAppSelector } from '@app/redux/reduxHooks';
import { useQueryClient } from '@tanstack/react-query';
import TradeItem from '@component/trade/item/TradeItem';
import NextPageFetcher from '@component/list/content/NextPageFetcher';
import useTradesQuery from '@api/query/trade/useTradesQuery';
import * as queryKey from '@api/queryKey';
import { StyledTradeList } from './_styles';

interface Props {
  groupId: number;
  memberId: number;
  to?: string;
}

function TradeList({ groupId, memberId, to }: Props) {
  const { userId } = useAppSelector(state => state.auth);
  const queryClient = useQueryClient();

  const {
    data: trades,
    isFetching,
    hasNextPage,
    refetch,
    fetchNextPage,
  } = useTradesQuery(
    { groupId, memberId, excludeUserId: userId, state: 'trading' },
    { enabled: userId !== 0 }
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
    <StyledTradeList>
      {trades?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.trades.map(trade => (
            <TradeItem
              key={trade.tradeId}
              to={to ? `${to}/${trade.tradeId}` : to}
              {...trade}
              tradeState={trade.state}
            />
          ))}
        </Fragment>
      ))}

      <NextPageFetcher hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </StyledTradeList>
  );
}

export default TradeList;
