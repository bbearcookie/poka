import { useInfiniteQuery, UseInfiniteQueryOptions, UseInfiniteQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ResponseError } from '@type/response';
import * as queryKey from '@api/queryKey';
import { fetchTrades } from '@api/api/trade';
import { TradeStateKey } from '@component/label/stateLabel/_types';
import { TradeListItemType } from '@type/trade';

interface FilterType {
  groupId: number;
  memberId: number;
  excludeUserId: number;
  state: TradeStateKey;
}

export interface ParamType {
  pageParam: number;
  filter: FilterType;
}

export interface ResType {
  message: string;
  paging: {
    pageParam: number;
    hasNextPage: boolean;
  };
  trades: TradeListItemType[];
}

export default function useTradesQuery(
  filter: FilterType,
  options?: UseInfiniteQueryOptions<ResType, AxiosError<ResponseError>>
): UseInfiniteQueryResult<ResType, AxiosError<ResponseError>> {

  return useInfiniteQuery<ResType, AxiosError<ResponseError>>({
    queryKey: queryKey.tradeKeys.all,
    queryFn: ({ pageParam = 0 }) => fetchTrades({ pageParam, filter }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.paging.hasNextPage && lastPage.paging.pageParam + 1;
    },
    refetchOnWindowFocus: false,
    ...options
  });
}