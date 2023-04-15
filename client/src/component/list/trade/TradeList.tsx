import { Fragment } from 'react';
import produce from 'immer';
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
  const { data: trades, hasNextPage, fetchNextPage } = useTradesQuery(filter, { enabled: userId !== 0 });

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
