import { useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ResponseError } from '@type/response';
import { getErrorMessage } from '@util/request';
import { addShippingRequest } from '@api/api/shipping/request';
import * as queryKey from '@api/queryKey';

interface BodyType {
  voucherIds: number[];
  address: {
    name: string;
    recipient: string;
    contact: string;
    postcode: string;
    address: string;
    addressDetail: string;
    requirement: string;
  };
}

interface ResType {
  message: string;
  requestId: number;
}

export default function useAddShippingRequest<TParam>(
  options?: UseMutationOptions<AxiosResponse<ResType>, AxiosError<ResponseError<TParam>>, BodyType>
) {
  const queryClient = useQueryClient();
  const voucherIds = useRef<number[]>([]);

  return useMutation<AxiosResponse<ResType>, AxiosError<ResponseError<TParam>>, BodyType>({
    ...options,
    mutationFn: body => addShippingRequest(body),
    onSuccess: (res, variables, context) => {
      toast.success(res.data.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      voucherIds.current.forEach(v => queryClient.invalidateQueries(queryKey.voucherKeys.detail(v)));
      queryClient.invalidateQueries(queryKey.voucherKeys.all);
      options?.onSuccess && options?.onSuccess(res, variables, context);
    },
    onError: (err, variables, context) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
      options?.onError && options?.onError(err, variables, context);
    },
    onMutate: params => {
      voucherIds.current = params.voucherIds;
    },
  });
}
