import { useRef } from 'react';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from '@util/request';
import { getErrorMessage } from '@util/request';
import { modifyPhoto } from '@api/api/photo';
import * as queryKey from '@api/queryKey';

export interface ParamType {
  photocardId: number;
  body: {
    name: string;
    groupId: number;
    memberId: number;
    image: File | null;
  }
}

interface ResType {
  message: string;
}

export default function useModifyPhoto<TParam>(
  onSuccess?: (res: AxiosResponse<ResType>) => void,
  onError?: (err: AxiosError<ErrorType<TParam>, any>) => void
): 
UseMutationResult<
  AxiosResponse<ResType>,
  AxiosError<ErrorType<TParam>>,
  ParamType
> {
  const queryClient = useQueryClient();
  const photocardId = useRef(0);

  return useMutation(modifyPhoto, {
    onSuccess: (res: AxiosResponse<ResType>) => {
      toast.success(res.data.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      queryClient.invalidateQueries(queryKey.photoKeys.all);
      queryClient.invalidateQueries(queryKey.photoKeys.detail(photocardId.current));
      if (onSuccess) onSuccess(res);
    },
    onError: (err) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
      if (onError) onError(err);
    },
    onMutate: (params) => {
      photocardId.current = params.photocardId;
    }
  })
}