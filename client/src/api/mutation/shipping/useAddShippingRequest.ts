import { useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from '@util/request';
import { getErrorMessage } from '@util/request';
import { addShippingRequest } from '@api/api/shipping';
import * as queryKey from '@api/queryKey';

export interface ParamType {
  body: {
    voucherIds: number[];
    address: {
      name: string;
      recipient: string;
      contact: string;
      postcode: string;
      address: string;
      addressDetail: string;
      requirement: string;
    }
  };
}

export interface ResType {
  message: string;
  requestId: number;
}

export default function useAddShippingRequest<TParam>(
  onSuccess?: (res: AxiosResponse<ResType>) => void,
  onError?: (err: AxiosError<ErrorType<TParam>, any>) => void
): 
UseMutationResult<
  AxiosResponse<ResType>,
  AxiosError<ErrorType<TParam>>,
  ParamType
> {
  const queryClient = useQueryClient();
  const voucherIds: React.MutableRefObject<number[]> = useRef([]);

  return useMutation(addShippingRequest, {
    onSuccess: (res: AxiosResponse<ResType>) => {
      toast.success(res.data.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      voucherIds.current.forEach(v => queryClient.invalidateQueries(queryKey.voucherKeys.detail(v)));
      queryClient.invalidateQueries(queryKey.voucherKeys.all);
      if (onSuccess) onSuccess(res);
    },
    onError: (err) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
      if (onError) onError(err);
    },
    onMutate: (params) => {
      voucherIds.current = params.body.voucherIds;
    }
  });
}