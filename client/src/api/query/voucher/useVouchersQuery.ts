import { useInfiniteQuery, UseInfiniteQueryOptions, UseInfiniteQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import { fetchVouchers } from '@api/api/voucher';
import { VoucherStateKey } from '@component/label/StateLabel';
import { State as FilterType } from '@component/list/voucher/reducer';
import { VoucherType } from '@type/voucher';
import * as queryKey from '@api/queryKey';

export interface ParamType {
  pageParam: number;
  filter: {
    groupId: number[];
    memberId: number[];
    excludeVoucherId: number[];
    photoName: string[];
    userName: string[];
    voucherState: VoucherStateKey;
  }
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

  const refinedFilter = {
    groupId: filter.groups
      .filter(item => item.checked)
      .map(item => item.id),
    memberId: filter.members
      .filter(item => item.checked)
      .map(item => item.id),
    excludeVoucherId: filter.excludeVoucherId,
    photoName: filter.names.map(item => item.value),
    userName: filter.usernames.map(item => item.value),
    voucherState: filter.state
  }

  return useInfiniteQuery<ResType, AxiosError<ErrorType>>({
    queryKey: queryKey.voucherKeys.all,
    queryFn: ({ pageParam = 0 }) => fetchVouchers({ pageParam, filter: refinedFilter }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.paging.hasNextPage && lastPage.paging.pageParam + 1;
    },
    refetchOnWindowFocus: false,
    ...options
  });
}