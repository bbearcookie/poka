import { useInfiniteQuery, UseInfiniteQueryOptions, UseInfiniteQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import { fetchVouchers } from '@api/api/voucher';
import { VoucherStateKey } from '@component/label/stateLabel/_types';
import { VoucherType } from '@type/voucher';
import * as queryKey from '@api/queryKey';

export interface FilterType {
  groupId: number[];
  memberId: number[];
  excludeVoucherId: number[];
  photoName: string[];
  userName: string[];
  voucherState: VoucherStateKey;
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
  vouchers: VoucherType[];
}

export default function useVouchersQuery(
  filter: FilterType,
  options?: UseInfiniteQueryOptions<ResType, AxiosError<ErrorType>>
): UseInfiniteQueryResult<ResType, AxiosError<ErrorType>> {
  return useInfiniteQuery<ResType, AxiosError<ErrorType>>({
    queryKey: queryKey.voucherKeys.all,
    queryFn: ({ pageParam = 0 }) => fetchVouchers({ pageParam, filter }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.paging.hasNextPage && lastPage.paging.pageParam + 1;
    },
    refetchOnWindowFocus: false,
    ...options
  });
}