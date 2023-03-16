import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ResponseError } from '@type/response';
import { Photo } from '@type/photo';
import { fetchPhotoDetail } from '@api/api/photo';
import * as queryKey from '@api/queryKey';

export interface ResType extends Photo {
  message: string;
}

export default function usePhotoQuery(
  photocardId: number,
  options?: UseQueryOptions<ResType, AxiosError<ResponseError>>
): UseQueryResult<ResType, AxiosError<ResponseError>> {
  return useQuery({
    queryKey: queryKey.photoKeys.detail(photocardId),
    queryFn: () => fetchPhotoDetail(photocardId),
    enabled: photocardId !== 0,
    ...options
  });
}