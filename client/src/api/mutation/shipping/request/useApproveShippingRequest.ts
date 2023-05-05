import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ResponseError } from '@type/response';
import { getErrorMessage } from '@util/request';
import * as queryKey from '@api/queryKey';
import { approveShippingRequest } from '@api/api/shipping/request';

interface ResType {
  message: string;
}

export default function useApproveShippingRequest<TParam>(
  requestId: number,
  options?: UseMutationOptions<AxiosResponse<ResType>, AxiosError<ResponseError<TParam>>>
) {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<ResType>, AxiosError<ResponseError<TParam>>>({
    mutationFn: () => approveShippingRequest(requestId),
    onSuccess: (res, variables, context) => {
      toast.success(res.data.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      queryClient.invalidateQueries(queryKey.shippingKeys.all);
      options?.onSuccess && options?.onSuccess(res, variables, context);
    },
    onError: (err, variables, context) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
      options?.onError && options?.onError(err, variables, context);
    },
  });
}
