import { useRef } from 'react';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ResponseError } from "@type/response";
import { getErrorMessage } from '@util/request';
import * as queryKey from '@api/queryKey';
import { checkShippingPayment } from '@api/api/shipping';

export interface ParamType {
  requestId: number;
  body: {
    impUID: string;
  }
}

interface ResType { message: string; }

export default function useCheckShippingPayment<TParam>(
  onSuccess?: (res: AxiosResponse<ResType>) => void,
  onError?: (err: AxiosError<ResponseError<TParam>, any>) => void
): 
UseMutationResult<
  AxiosResponse<ResType>,
  AxiosError<ResponseError<TParam>>,
  ParamType
> {
  const requestId = useRef(0);
  const queryClient = useQueryClient();

  return useMutation(checkShippingPayment, {
    onSuccess: (res: AxiosResponse<ResType>) => {
      toast.success(res.data.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      queryClient.invalidateQueries(queryKey.shippingKeys.all);
      queryClient.invalidateQueries(queryKey.shippingKeys.detail(requestId.current));
      if (onSuccess) onSuccess(res);
    },
    onError: (err) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
      if (onError) onError(err);
    },
    onMutate: (param) => {
      requestId.current = param.requestId;
    }
  })
}