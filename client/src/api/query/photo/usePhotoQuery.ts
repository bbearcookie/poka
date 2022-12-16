import { useQuery, QueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import { PhotoType } from '@type/photo';
import { fetchPhotoDetail } from '@api/api/photo';
import * as queryKey from '@api/queryKey';

export interface ResType extends PhotoType {
  message: string;
}

export default function usePhotoQuery(
  photocardId: number,
  options?: QueryOptions<ResType, AxiosError<ErrorType>>
): UseQueryResult<ResType, AxiosError<ErrorType>> {
  return useQuery(queryKey.photoKeys.detail(photocardId), () => fetchPhotoDetail(photocardId), options);
}