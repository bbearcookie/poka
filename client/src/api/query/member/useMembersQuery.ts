import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import { fetchMembers } from '@api/api/member';
import * as queryKey from '@api/queryKey';

export interface ResType {
  message: string;
  members: {
    member_id: number;
    group_id: number;
    name: string;
  }[];
}

export default function useMembersQuery(
  options?: UseQueryOptions<ResType, AxiosError<ErrorType>>
): UseQueryResult<ResType, AxiosError<ErrorType>> {
  return useQuery({
    queryKey: queryKey.memberKeys.all,
    queryFn: fetchMembers,
    ...options
  });
}