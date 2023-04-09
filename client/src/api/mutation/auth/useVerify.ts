import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ResponseError } from "@type/response";
import { getErrorMessage } from '@util/request';
import { useAppDispatch } from '@app/redux/store';
import { LoginToken } from '@type/user';
import { login } from '@util/auth/authSlice';
import { removeUserFromStorage } from '@util/auth/auth';
import { verify } from '@api/api/auth';

export interface ResType {
  message: string;
  user: LoginToken;
}

export default function useVerify<TParam>(
  onSuccess?: (res: AxiosResponse<ResType>) => void,
  onError?: (err: AxiosError<ResponseError<TParam>, any>) => void
): 
UseMutationResult<
  AxiosResponse<ResType>,
  AxiosError<ResponseError<TParam>>
> {
  const dispatch = useAppDispatch();

  return useMutation(verify, {
    onSuccess: (res: AxiosResponse<ResType>) => {
      dispatch(login(res.data.user));
      if (onSuccess) onSuccess(res);
    },
    onError: (err) => {
      toast.error(getErrorMessage(err), { autoClose: 2000, position: toast.POSITION.BOTTOM_RIGHT });
      removeUserFromStorage();
      if (onError) onError(err);
    }
  });
}