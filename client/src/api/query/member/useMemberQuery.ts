import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import { fetchMemberDetail } from '@api/api/member';
import * as queryKey from '@api/queryKey';

export interface ResType {
  message: string;
  group_id: number;
  group_name: string;
  member_id: number;
  name: string;
  photo_cnt: number;
}

export default function useMemberQuery(
  memberId: number,
  options?: UseQueryOptions<ResType, AxiosError<ErrorType>>
): UseQueryResult<ResType, AxiosError<ErrorType>> {
  return useQuery({
    queryKey: queryKey.memberKeys.detail(memberId),
    queryFn: () => fetchMemberDetail(memberId),
    ...options
  });
}