import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import { fetchGroups } from '@api/api/group';
import * as queryKey from '@api/queryKey';

export interface ResType {
  message: string;
  groups: {
    group_id: number;
    name: string;
    image_name: string;
    member_cnt: number;
  }[];
}

export default function useGroupsQuery(
  options?: UseQueryOptions<ResType, AxiosError<ErrorType>>
): UseQueryResult<ResType, AxiosError<ErrorType>> {
  return useQuery({
    queryKey: queryKey.groupKeys.all,
    queryFn: fetchGroups,
    ...options
  });
}