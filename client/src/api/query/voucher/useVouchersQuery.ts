import { useInfiniteQuery, UseInfiniteQueryOptions, UseInfiniteQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ResponseError } from '@type/response';
import { fetchVouchers } from '@api/api/voucher';
import { VoucherStateKey } from '@component/label/stateLabel/_types';
import { VoucherItem } from '@type/voucher';
import * as queryKey from '@api/queryKey';

export interface FilterType {
  groupIds: number[];
  memberIds: number[];
  excludeVoucherIds: number[];
  photoNames: string[];
  userNames: string[];
  voucherState: VoucherStateKey;
}

export interface ResType {
  message: string;
  paging: {
    pageParam: number;
    hasNextPage: boolean;
  };
  vouchers: VoucherItem[];
}

export default function useVouchersQuery(
  filter: FilterType,
  options?: UseInfiniteQueryOptions<ResType, AxiosError<ResponseError>>
): UseInfiniteQueryResult<ResType, AxiosError<ResponseError>> {
  return useInfiniteQuery<ResType, AxiosError<ResponseError>>({
    queryKey: queryKey.voucherKeys.all,
    queryFn: ({ pageParam = 0 }) => fetchVouchers({ pageParam, filter }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.paging.hasNextPage && lastPage.paging.pageParam + 1;
    },
    refetchOnWindowFocus: false,
    ...options
  });
}