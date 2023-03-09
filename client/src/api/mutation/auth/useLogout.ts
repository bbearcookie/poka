import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ResponseError } from "@type/response";
import { getErrorMessage } from '@util/request';
import { useAppDispatch } from '@app/redux/reduxHooks';
import { logout } from '@util/auth/authSlice';
import { logout as logoutFn } from '@api/api/auth';

export interface ParamType {}

interface ResType { message: string; }

export default function useLogout<TParam>(
  onSuccess?: (res: AxiosResponse<ResType>) => void,
  onError?: (err: AxiosError<ResponseError<TParam>, any>) => void
): 
UseMutationResult<
  AxiosResponse<ResType>,
  AxiosError<ResponseError<TParam>>,
  ParamType
> {
  const dispatch = useAppDispatch();

  return useMutation(logoutFn, {
    onSuccess: (res: AxiosResponse<ResType>) => {
      toast.success(res.data.message, { autoClose: 2000, position: toast.POSITION.TOP_CENTER });
      dispatch(logout());
      if (onSuccess) onSuccess(res);
    },
    onError: (err) => {
      toast.error(getErrorMessage(err), { autoClose: 2000, position: toast.POSITION.BOTTOM_RIGHT });
      if (onError) onError(err);
    }
  });
}