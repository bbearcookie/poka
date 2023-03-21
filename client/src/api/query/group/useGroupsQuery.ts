import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ResponseError } from "@type/response";
import { fetchGroups } from '@api/api/group';
import * as queryKey from '@api/queryKey';

export interface ResType {
  message: string;
  groups: {
    groupId: number;
    name: string;
    imageName: string;
    memberCount: number;
  }[];
}

export default function useGroupsQuery(
  options?: UseQueryOptions<ResType, AxiosError<ResponseError>>
): UseQueryResult<ResType, AxiosError<ResponseError>> {
  return useQuery({
    queryKey: queryKey.groupKeys.all,
    queryFn: () => fetchGroups(),
    ...options
  });
}