import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import { fetchUserDetail } from '@api/api/user';
import * as queryKey from '@api/queryKey';

export interface ResType {
  message: string;
  user_id: number;
  username: string;
  nickname: string;
  image_name: string;
}

export default function useUserQuery(
  userId: number,
  options?: UseQueryOptions<ResType, AxiosError<ErrorType>>
): UseQueryResult<ResType, AxiosError<ErrorType>> {
  return useQuery({
    queryKey: queryKey.userKeys.profile(userId),
    queryFn: () => fetchUserDetail(userId),
    enabled: userId !== 0,
    ...options
  });
}