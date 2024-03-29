import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ResponseError } from '@type/response';
import * as queryKey from '@api/queryKey';
import { fetchTrades } from '@api/api/trade';
import { TradeStateKey } from '@component/label/stateLabel/_types';
import { TradeItem } from '@type/trade';

export interface FilterType {
  groupId?: number;
  memberId?: number;
  userId?: number;
  excludeUserId?: number;
  state?: TradeStateKey;
}

export interface ResType {
  message: string;
  paging: {
    pageParam: number;
    hasNextPage: boolean;
  };
  trades: TradeItem[];
}

export default function useTradesQuery(
  filter: FilterType,
  options?: UseInfiniteQueryOptions<ResType, AxiosError<ResponseError>>
): UseInfiniteQueryResult<ResType, AxiosError<ResponseError>> {
  return useInfiniteQuery<ResType, AxiosError<ResponseError>>({
    queryKey: queryKey.tradeKeys.list(filter),
    queryFn: ({ pageParam = 0 }) => fetchTrades({ pageParam, filter }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.paging.hasNextPage && lastPage.paging.pageParam + 1;
    },
    refetchOnWindowFocus: false,
    ...options,
  });
}
