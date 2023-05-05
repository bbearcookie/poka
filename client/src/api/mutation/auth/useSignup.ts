import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ResponseError } from '@type/response';
import { getErrorMessage } from '@util/request';
import { signup } from '@api/api/auth';

interface BodyType {
  username: string;
  nickname: string;
  password: string;
  passwordCheck: string;
}

interface ResType {
  message: string;
}

export default function useSignup<TParam>(
  options?: UseMutationOptions<AxiosResponse<ResType>, AxiosError<ResponseError<TParam>>, BodyType>
) {
  return useMutation<AxiosResponse<ResType>, AxiosError<ResponseError<TParam>>, BodyType>({
    mutationFn: body => signup(body),
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
