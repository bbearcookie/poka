import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { modifyMember } from '@api/api/member';
import { AxiosError, AxiosResponse } from 'axios';
import { ResponseError } from "@type/response";
import { getErrorMessage } from '@util/request';
import * as queryKey from '@api/queryKey';

export interface ParamType {
  memberId: number;
  body: {
    name: string;
  }
}

interface ResType {
  message: string;
  groupId: number;
  memberId: number;
}

export default function useModifyMember<TParam>(
  onSuccess?: (res: AxiosResponse<ResType>) => void,
  onError?: (err: AxiosError<ResponseError<TParam>, any>) => void
): 
UseMutationResult<
  AxiosResponse<ResType>,
  AxiosError<ResponseError<TParam>>,
  ParamType
> {
  const queryClient = useQueryClient();

  return useMutation(modifyMember, {
    onSuccess: (res: AxiosResponse<ResType>) => {
      queryClient.invalidateQueries(queryKey.groupKeys.all);
      queryClient.invalidateQueries(queryKey.groupKeys.detail(res.data.groupId));
      queryClient.invalidateQueries(queryKey.memberKeys.all);
      queryClient.invalidateQueries(queryKey.memberKeys.detail(res.data.memberId));
      if (onSuccess) onSuccess(res);
    },
    onError: (err) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
      if (onError) onError(err);
    }
  })
}