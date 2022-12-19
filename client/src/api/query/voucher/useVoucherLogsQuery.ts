import { useInfiniteQuery, UseInfiniteQueryOptions, UseInfiniteQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import { fetchVoucherLogsDetail } from '@api/api/voucher';
import { VoucherLogType } from '@type/voucher';
import * as queryKey from '@api/queryKey';

export interface ParamType {
  pageParam: number;
}

export interface ResType {
  message: string;
  paging: {
    pageParam: number;
    hasNextPage: boolean;
  };
  logs: VoucherLogType[];
}

export default function useVoucherLogsQuery(
  voucherId: number,
  options?: UseInfiniteQueryOptions<ResType, AxiosError<ErrorType>>
): UseInfiniteQueryResult<ResType, AxiosError<ErrorType>> {
  return useInfiniteQuery<ResType, AxiosError<ErrorType>>({
    queryKey: queryKey.photoKeys.all,
    queryFn: ({ pageParam = 0 }) => fetchVoucherLogsDetail(voucherId, { pageParam }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.paging.hasNextPage && lastPage.paging.pageParam + 1;
    },
    refetchOnWindowFocus: false,
    ...options
  });
}