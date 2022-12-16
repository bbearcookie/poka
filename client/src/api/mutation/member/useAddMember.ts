import { useRef } from 'react';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addMember } from '@api/api/member';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from '@util/request';
import { getErrorMessage } from '@util/request';
import * as queryKey from '@api/queryKey';

export interface ParamType {
  groupId: number;
  body: {
    name: string;
  }
}

interface ResType {
  message: string;
  memberId: number;
}

export default function useAddMember<TParam>(
  onSuccess?: (res: AxiosResponse<ResType>) => void,
  onError?: (err: AxiosError<ErrorType<TParam>, any>) => void
): 
UseMutationResult<
  AxiosResponse<ResType>,
  AxiosError<ErrorType<TParam>>,
  ParamType
> {
  const queryClient = useQueryClient();
  const groupId = useRef(0);

  return useMutation(addMember, {
    onSuccess: (res: AxiosResponse<ResType>) => {
      toast.success(res.data.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      queryClient.invalidateQueries(queryKey.groupKeys.all);
      queryClient.invalidateQueries(queryKey.groupKeys.detail(groupId.current));
      if (onSuccess) onSuccess(res);
    },
    onError: (err) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
      if (onError) onError(err);
    },
    onMutate: (params) => {
      groupId.current = params.groupId;
    }
  });
}