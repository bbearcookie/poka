import { useQuery, QueryOptions, UseQueryResult } from '@tanstack/react-query';
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
  options?: QueryOptions<ResType, AxiosError<ErrorType>>
): UseQueryResult<ResType, AxiosError<ErrorType>> {
  return useQuery(queryKey.groupKeys.all, fetchGroups, options);
}