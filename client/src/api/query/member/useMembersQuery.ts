import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ResponseError } from "@type/response";
import { fetchMembers } from '@api/api/member';
import * as queryKey from '@api/queryKey';

export interface ResType {
  message: string;
  members: {
    memberId: number;
    groupId: number;
    name: string;
  }[];
}

export default function useMembersQuery(
  options?: UseQueryOptions<ResType, AxiosError<ResponseError>>
): UseQueryResult<ResType, AxiosError<ResponseError>> {
  return useQuery({
    queryKey: queryKey.memberKeys.all,
    queryFn: fetchMembers,
    ...options
  });
}