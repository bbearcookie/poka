import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import { fetchGroupDetail } from '@api/api/group';
import * as queryKey from '@api/queryKey';

export interface ResType {
  message: string;
  group_id: number;
  name: string;
  image_name: string;
  members: {
    group_id: number;
    member_id: number;
    name: string;
    photo_cnt: number;
  }[];
}

export default function useGroupQuery(
  groupId: number,
  options?: UseQueryOptions<ResType, AxiosError<ErrorType>>
): UseQueryResult<ResType, AxiosError<ErrorType>> {
  return useQuery({
    queryKey: queryKey.groupKeys.detail(groupId),
    queryFn: () => fetchGroupDetail(groupId),
    ...options
  });
}