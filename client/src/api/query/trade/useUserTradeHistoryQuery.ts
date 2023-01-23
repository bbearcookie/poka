import { useInfiniteQuery, UseInfiniteQueryOptions, UseInfiniteQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import * as queryKey from '@api/queryKey';
import { TradeHistoryType } from '@type/trade';
import { fetchUserTradeHistory } from '@api/api/trade';

interface FilterType {
  startDate: Date;
  endDate: Date;
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
  histories: TradeHistoryType[];
}

export default function useUserTradeHistoryQuery(
  userId: number,
  filter: FilterType,
  options?: UseInfiniteQueryOptions<ResType, AxiosError<ErrorType>>
): UseInfiniteQueryResult<ResType, AxiosError<ErrorType>> {
  return useInfiniteQuery<ResType, AxiosError<ErrorType>>({
    queryKey: queryKey.userKeys.tradeHistory(userId),
    queryFn: ({ pageParam = 0 }) => fetchUserTradeHistory(userId, { pageParam, filter }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.paging.hasNextPage && lastPage.paging.pageParam + 1;
    },
    refetchOnWindowFocus: false,
    ...options
  });
}