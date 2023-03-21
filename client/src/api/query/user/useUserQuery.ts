import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ResponseError } from '@type/response';
import { fetchUserDetail } from '@api/api/user';
import { User } from '@type/user';
import * as queryKey from '@api/queryKey';

export interface ResType extends User {
  message: string;
}

export default function useUserQuery(
  userId: number,
  options?: UseQueryOptions<ResType, AxiosError<ResponseError>>
): UseQueryResult<ResType, AxiosError<ResponseError>> {
  return useQuery({
    queryKey: queryKey.userKeys.profile(userId),
    queryFn: () => fetchUserDetail(userId),
    enabled: userId !== 0,
    ...options
  });
}