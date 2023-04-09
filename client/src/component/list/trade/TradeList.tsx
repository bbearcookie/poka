import { Fragment, useCallback } from 'react';
import produce from 'immer';
import { useUpdateEffect } from 'react-use';
import { useAppSelector } from '@app/redux/store';
import TradeItem from '@component/trade/item/TradeItem';
import NextPageFetcher from '@component/list/content/NextPageFetcher';
import useTradesQuery, { FilterType } from '@api/query/trade/useTradesQuery';
import { StyledTradeList } from './_styles';
import { LocationState } from '@type/react-router';

interface Props {
  filter: FilterType;
  location?: {
    to: string;
    state?: LocationState;
  };
}

function TradeList({ filter, location = { to: '#' } }: Props) {
  const { userId } = useAppSelector(state => state.auth);

  const {
    data: trades,
    isFetching,
    hasNextPage,
    refetch,
    fetchNextPage,
  } = useTradesQuery(filter, { enabled: userId !== 0 });

  // 검색 필터 변경시 데이터 리패칭
  const handleRefetch = useCallback(async () => {
    refetch();
  }, [refetch]);
  useUpdateEffect(() => {
    handleRefetch();
  }, [filter]);

  return (
    <StyledTradeList>
      {trades?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.trades.map(trade => (
            <TradeItem
              key={trade.tradeId}
              location={produce(location, draft => {
                draft.to = `${location.to}/${trade.tradeId}`;
              })}
              tradeState={trade.state}
              {...trade}
            />
          ))}
        </Fragment>
      ))}

      <NextPageFetcher hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </StyledTradeList>
  );
}

export default TradeList;
