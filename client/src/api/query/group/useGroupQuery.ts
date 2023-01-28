import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
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
  options?: UseQueryOptions<ResType, AxiosError<ErrorType>>
): UseQueryResult<ResType, AxiosError<ErrorType>> {
  return useQuery({
    queryKey: queryKey.groupKeys.detail(groupId),
    queryFn: () => fetchGroupDetail(groupId),
    enabled: groupId !== 0,
    ...options
  });
}