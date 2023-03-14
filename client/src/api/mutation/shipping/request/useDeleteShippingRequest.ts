import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ResponseError } from "@type/response";
import { getErrorMessage } from '@util/request';
import * as queryKey from '@api/queryKey';
import { deleteShippingRequest } from '@api/api/shipping';

export interface ParamType {
  requestId: number;
}

interface ResType { message: string; }

export default function useDeleteShippingRequest<TParam>(
  requestId: number,
  voucherIds: number[],
  onSuccess?: (res: AxiosResponse<ResType>) => void,
  onError?: (err: AxiosError<ResponseError<TParam>, any>) => void
): 
UseMutationResult<
  AxiosResponse<ResType>,
  AxiosError<ResponseError<TParam>>,
  ParamType
> {
  const queryClient = useQueryClient();

  return useMutation(deleteShippingRequest, {
    onSuccess: (res: AxiosResponse<ResType>) => {
      toast.success(res.data.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      queryClient.invalidateQueries(queryKey.shippingKeys.detail(requestId));
      queryClient.invalidateQueries(queryKey.shippingKeys.all);
      voucherIds.forEach(v => queryClient.invalidateQueries(queryKey.voucherKeys.detail(v)));
      queryClient.invalidateQueries(queryKey.voucherKeys.all);
      if (onSuccess) onSuccess(res);
    },
    onError: (err) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
      if (onError) onError(err);
    }
  })
}