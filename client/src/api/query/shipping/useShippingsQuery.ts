import { useInfiniteQuery, UseInfiniteQueryOptions, UseInfiniteQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ResponseError } from '@type/response';
import { fetchShippings } from '@api/api/shipping';
import { ShippingListItemType } from '@type/shipping';
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
  shippings: ShippingListItemType[];
}

export default function useShippingsQuery(
  options?: UseInfiniteQueryOptions<ResType, AxiosError<ResponseError>>
): UseInfiniteQueryResult<ResType, AxiosError<ResponseError>> {

  return useInfiniteQuery<ResType, AxiosError<ResponseError>>({
    queryKey: queryKey.shippingKeys.all,
    queryFn: ({ pageParam = 0 }) => fetchShippings({ pageParam }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.paging.hasNextPage && lastPage.paging.pageParam + 1;
    },
    refetchOnWindowFocus: false,
    ...options
  });
}