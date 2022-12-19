import { useRef } from 'react';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from '@util/request';
import { getErrorMessage } from '@util/request';
import { modifyUserProfile } from '@api/api/user';
import * as queryKey from '@api/queryKey';

export interface ParamType {
  userId: number;
  body: {
    nickname: string;
    image: File | null;
  };
}

interface ResType {
  message: string;
}

export default function useModifyUserProfile<TParam>(
  onSuccess?: (res: AxiosResponse<ResType>) => void,
  onError?: (err: AxiosError<ErrorType<TParam>, any>) => void
): 
UseMutationResult<
  AxiosResponse<ResType>,
  AxiosError<ErrorType<TParam>>,
  ParamType
> {
  const queryClient = useQueryClient();
  const userId = useRef(0);

  return useMutation({
    mutationFn: modifyUserProfile,
    onSuccess: (res: AxiosResponse<ResType>) => {
      toast.success(res.data.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      queryClient.invalidateQueries(queryKey.userKeys.profile(userId.current));
      if (onSuccess) onSuccess(res);
    },
    onError: (err) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
      if (onError) onError(err);
    },
    onMutate: (params) => {
      userId.current = params.userId;
    }
  });
}