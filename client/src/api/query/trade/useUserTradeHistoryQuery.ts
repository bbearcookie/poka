import { useInfiniteQuery, UseInfiniteQueryOptions, UseInfiniteQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ResponseError } from '@type/response';
import * as queryKey from '@api/queryKey';
import { TradeHistory } from '@type/trade';
import { fetchUserTradeHistory } from '@api/api/trade';

export interface FilterType {
  startDate: Date;
  endDate: Date;
}

export interface ResType {
  message: string;
  paging: {
    pageParam: number;
    hasNextPage: boolean;
  };
  histories: TradeHistory[];
}

export default function useUserTradeHistoryQuery(
  userId: number,
  filter: FilterType,
  options?: UseInfiniteQueryOptions<ResType, AxiosError<ResponseError>>
): UseInfiniteQueryResult<ResType, AxiosError<ResponseError>> {
  return useInfiniteQuery<ResType, AxiosError<ResponseError>>({
    queryKey: queryKey.tradeKeys.history(filter),
    queryFn: ({ pageParam = 0 }) => fetchUserTradeHistory(userId, { pageParam, filter }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.paging.hasNextPage && lastPage.paging.pageParam + 1;
    },
    refetchOnWindowFocus: false,
    ...options
  });
}