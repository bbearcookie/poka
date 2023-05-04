import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ResponseError } from '@type/response';
import { getErrorMessage } from '@util/request';
import { addVouchers } from '@api/api/voucher';

interface BodyType {
  username: string;
  vouchers: {
    photocardId: number;
    amount: number;
  }[];
}

interface ResType {
  message: string;
}

export default function useAddVouchers<TParam>(
  options?: Omit<
    UseMutationOptions<AxiosResponse<ResType>, AxiosError<ResponseError<TParam>>, BodyType, unknown>,
    'mutationFn'
  >
) {
  return useMutation<AxiosResponse<ResType>, AxiosError<ResponseError<TParam>>, BodyType>(body => addVouchers(body), {
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
