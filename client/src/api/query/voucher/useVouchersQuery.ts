import { useInfiniteQuery, UseInfiniteQueryOptions, UseInfiniteQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import { fetchVouchers } from '@api/api/voucher';
import { VoucherStateKey } from "@type/voucher";
import { FilterType } from '@component/list/voucher/voucherListSlice';
import { VoucherType } from '@type/voucher';
import * as queryKey from '@api/queryKey';

export interface ParamType {
  pageParam: number;
  filter: {
    GROUP_ID: number[];
    MEMBER_ID: number[];
    PHOTO_NAME: string[];
    USER_NAME: string[];
    VOUCHER_STATE: VoucherStateKey;
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

  // console.log(filter);

  const refinedFilter = {
    GROUP_ID: filter.groups
      .filter(item => item.checked)
      .map(item => item.groupId),
    MEMBER_ID: filter.members
      .filter(item => item.checked)
      .map(item => item.memberId),
    PHOTO_NAME: filter.names.map(item => item.value),
    USER_NAME: filter.usernames.map(item => item.value),
    VOUCHER_STATE: filter.state
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