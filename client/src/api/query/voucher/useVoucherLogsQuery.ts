import { useInfiniteQuery, UseInfiniteQueryOptions, UseInfiniteQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ResponseError } from '@type/response';
import { fetchVoucherLogsDetail } from '@api/api/voucher';
import { VoucherLogType } from '@type/voucher';
import * as queryKey from '@api/queryKey';

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
  options?: UseInfiniteQueryOptions<ResType, AxiosError<ResponseError>>
): UseInfiniteQueryResult<ResType, AxiosError<ResponseError>> {
  return useInfiniteQuery<ResType, AxiosError<ResponseError>>({
    queryKey: queryKey.voucherKeys.log(voucherId),
    queryFn: ({ pageParam = 0 }) => fetchVoucherLogsDetail(voucherId, { pageParam }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.paging.hasNextPage && lastPage.paging.pageParam + 1;
    },
    refetchOnWindowFocus: false,
    enabled: voucherId !== 0,
    ...options
  });
}