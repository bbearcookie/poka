import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ResponseError } from "@type/response";
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
  options?: UseQueryOptions<ResType, AxiosError<ResponseError>>
): UseQueryResult<ResType, AxiosError<ResponseError>> {
  return useQuery({
    queryKey: queryKey.memberKeys.detail(memberId),
    queryFn: () => fetchMemberDetail(memberId),
    enabled: memberId !== 0,
    ...options
  });
}