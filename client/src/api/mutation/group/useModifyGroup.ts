import { useRef } from 'react';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ResponseError } from "@type/response";
import { getErrorMessage } from '@util/request';
import * as queryKey from '@api/queryKey';
import { modifyGroup } from '@api/api/group';

export interface ParamType {
  groupId: number;
  body: {
    name: string;
    image: File | null;
  }
}

interface ResType { message: string; }

export default function useModifyGroup<TParam>(
  onSuccess?: (res: AxiosResponse<ResType>) => void,
  onError?: (err: AxiosError<ResponseError<TParam>, any>) => void
): 
UseMutationResult<
  AxiosResponse<ResType>,
  AxiosError<ResponseError<TParam>>,
  ParamType
> {
  const queryClient = useQueryClient();
  const groupId = useRef(0);

  return useMutation(modifyGroup, {
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
  })
}