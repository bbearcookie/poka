import { useRef } from 'react';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from '@util/request';
import { getErrorMessage } from '@util/request';
import { modifyTrade } from '@api/api/trade';
import * as queryKey from '@api/queryKey';

export interface ParamType {
  tradeId: number;
  body: {
    haveVoucherId: number;
    wantPhotocardIds: number[];
    amount: number;
  }
}

interface ResType {
  message: string;
}

export default function useModifyTrade<TParam>(
  onSuccess?: (res: AxiosResponse<ResType>) => void,
  onError?: (err: AxiosError<ErrorType<TParam>, any>) => void
): 
UseMutationResult<
  AxiosResponse<ResType>,
  AxiosError<ErrorType<TParam>>,
  ParamType
> {
  const queryClient = useQueryClient();
  const tradeId = useRef(0);

  return useMutation(modifyTrade, {
    onSuccess: (res: AxiosResponse<ResType>) => {
      toast.success(res.data.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      queryClient.invalidateQueries(queryKey.tradeKeys.all);
      queryClient.invalidateQueries(queryKey.tradeKeys.detail(tradeId.current));
      if (onSuccess) onSuccess(res);
    },
    onError: (err) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
      if (onError) onError(err);
    },
    onMutate: (params) => {
      tradeId.current = params.tradeId;
    }
  })
}