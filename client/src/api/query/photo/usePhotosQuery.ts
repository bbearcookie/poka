import { useInfiniteQuery, UseInfiniteQueryOptions, UseInfiniteQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ResponseError } from '@type/response';
import { fetchPhotos } from '@api/api/photo';
import { PhotoType } from '@type/photo';
import * as queryKey from '@api/queryKey';

export interface FilterType {
  groupId: number[];
  memberId: number[];
  photoName: string[];
}

export interface ResType {
  message: string;
  paging: {
    pageParam: number;
    hasNextPage: boolean;
  };
  photos: PhotoType[];
}

export default function usePhotosQuery(
  filter: FilterType,
  options?: UseInfiniteQueryOptions<ResType, AxiosError<ResponseError>>
): UseInfiniteQueryResult<ResType, AxiosError<ResponseError>> {

  return useInfiniteQuery<ResType, AxiosError<ResponseError>>({
    queryKey: queryKey.photoKeys.all,
    queryFn: ({ pageParam = 0 }) => fetchPhotos({ pageParam, filter }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.paging.hasNextPage && lastPage.paging.pageParam + 1;
    },
    refetchOnWindowFocus: false,
    ...options
  });
}