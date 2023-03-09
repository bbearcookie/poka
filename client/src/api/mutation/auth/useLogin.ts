import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ResponseError } from "@type/response";
import { getErrorMessage } from '@util/request';
import { useAppDispatch } from '@app/redux/reduxHooks';
import { LoginTokenPayloadType } from '@type/user';
import { login } from '@util/auth/authSlice';
import { login as loginFn } from '@api/api/auth';

export interface ParamType {
  body: {
    username: string;
    password: string;
  }
}

interface ResType {
  message: string;
  user: LoginTokenPayloadType;
}

export default function useLogin<TParam>(
  onSuccess?: (res: AxiosResponse<ResType>) => void,
  onError?: (err: AxiosError<ResponseError<TParam>, any>) => void
): 
UseMutationResult<
  AxiosResponse<ResType>,
  AxiosError<ResponseError<TParam>>,
  ParamType
> {
  const dispatch = useAppDispatch();

  return useMutation(loginFn, {
    onSuccess: (res: AxiosResponse<ResType>) => {
      toast.success(res.data.message, { autoClose: 2000, position: toast.POSITION.TOP_CENTER });
      dispatch(login(res.data.user));
      if (onSuccess) onSuccess(res);
    },
    onError: (err) => {
      toast.error(getErrorMessage(err), { autoClose: 2000, position: toast.POSITION.BOTTOM_RIGHT });
      if (onError) onError(err);
    }
  });
}