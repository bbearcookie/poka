import { useInfiniteQuery, UseInfiniteQueryOptions, UseInfiniteQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import { fetchPhotos } from '@api/api/photo';
import { FilterType } from '@component/list/photo/photoListCardSlice';
import { PhotoType } from '@api/photoAPI';
import * as queryKey from '@api/queryKey';

export interface ParamType {
  pageParam: number;
  filter: {
    GROUP_ID: number[];
    MEMBER_ID: number[];
    PHOTO_NAME: string[];
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
    GROUP_ID: filter.groups
      .filter(item => item.checked)
      .map(item => item.groupId),
    MEMBER_ID: filter.members
      .filter(item => item.checked)
      .map(item => item.memberId),
    PHOTO_NAME: filter.names.map(item => item.value)
  }

  return useInfiniteQuery<ResType, AxiosError<ErrorType>>(
    queryKey.photoKeys.all,
    ({ pageParam = 0 }) => fetchPhotos({ pageParam, filter: refinedFilter }),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.paging.hasNextPage && lastPage.paging.pageParam + 1;
      },
      refetchOnWindowFocus: false,
      ...options
    }
  )
}