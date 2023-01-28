import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import { fetchMemberDetail } from '@api/api/member';
import * as queryKey from '@api/queryKey';

export interface ResType {
  message: string;
  groupId: number;
  memberId: number;
  groupName: string;
  name: string;
  photoCount: number;
}

export default function useMemberQuery(
  memberId: number,
  options?: UseQueryOptions<ResType, AxiosError<ErrorType>>
): UseQueryResult<ResType, AxiosError<ErrorType>> {
  return useQuery({
    queryKey: queryKey.memberKeys.detail(memberId),
    queryFn: () => fetchMemberDetail(memberId),
    enabled: memberId !== 0,
    ...options
  });
}