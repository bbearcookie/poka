import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addPhotos } from '@api/api/photo';
import { AxiosError, AxiosResponse } from 'axios';
import { ResponseError } from '@type/response';
import { getErrorMessage } from '@util/request';

interface ResType {
  message: string;
}

export default function useAddPhotos<TParam>(
  options?: UseMutationOptions<AxiosResponse<ResType>, AxiosError<ResponseError<TParam>>, unknown>
) {
  return useMutation<AxiosResponse<ResType>, AxiosError<ResponseError<TParam>>, FormData>({
    ...options,
    mutationFn: body => addPhotos(body),
    onSuccess: (res, variables, context) => {
      toast.success(res.data.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      options?.onSuccess && options?.onSuccess(res, variables, context);
    },
    onError: (err, variables, context) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
      options?.onError && options?.onError(err, variables, context);
    },
  });
}
