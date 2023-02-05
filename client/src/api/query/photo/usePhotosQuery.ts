import { useInfiniteQuery, UseInfiniteQueryOptions, UseInfiniteQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import { fetchPhotos } from '@api/api/photo';
import { State as FilterType } from '@component/list/photo/reducer';
import { PhotoType } from '@type/photo';
import * as queryKey from '@api/queryKey';

export interface ParamType {
  pageParam: number;
  filter: {
    groupId: number[];
    memberId: number[];
    photoName: string[];
  }
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
  options?: UseInfiniteQueryOptions<ResType, AxiosError<ErrorType>>
): UseInfiniteQueryResult<ResType, AxiosError<ErrorType>> {

  const refinedFilter = {
    groupId: filter.groups
      .filter(item => item.checked)
      .map(item => item.groupId),
    memberId: filter.members
      .filter(item => item.checked)
      .map(item => item.memberId),
    photoName: filter.names.map(item => item.value)
  }

  return useInfiniteQuery<ResType, AxiosError<ErrorType>>({
    queryKey: queryKey.photoKeys.all,
    queryFn: ({ pageParam = 0 }) => fetchPhotos({ pageParam, filter: refinedFilter }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.paging.hasNextPage && lastPage.paging.pageParam + 1;
    },
    refetchOnWindowFocus: false,
    ...options
  });
}