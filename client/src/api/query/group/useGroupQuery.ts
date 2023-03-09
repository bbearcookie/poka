import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ResponseError } from "@type/response";
import { fetchGroupDetail } from '@api/api/group';
import * as queryKey from '@api/queryKey';

export interface ResType {
  message: string;
  groupId: number;
  name: string;
  imageName: string;
  members: {
    groupId: number;
    memberId: number;
    name: string;
    photoCount: number;
  }[];
}

export default function useGroupQuery(
  groupId: number,
  options?: UseQueryOptions<ResType, AxiosError<ResponseError>>
): UseQueryResult<ResType, AxiosError<ResponseError>> {
  return useQuery({
    queryKey: queryKey.groupKeys.detail(groupId),
    queryFn: () => fetchGroupDetail(groupId),
    enabled: groupId !== 0,
    ...options
  });
}