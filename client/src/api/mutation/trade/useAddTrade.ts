import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from '@util/request';
import { getErrorMessage } from '@util/request';
import { addTrade } from '@api/api/trade';

export interface ParamType {
  body: {
    haveVoucherId: number;
    wantPhotocardIds: number[];
    amount: number;
  }
}

interface ResType { message: string; }

export default function useAddTrade<TParam>(
  onSuccess?: (res: AxiosResponse<ResType>) => void,
  onError?: (err: AxiosError<ErrorType<TParam>, any>) => void
): 
UseMutationResult<
  AxiosResponse<ResType>,
  AxiosError<ErrorType<TParam>>,
  ParamType
> {
  return useMutation(addTrade, {
    onSuccess: (res: AxiosResponse<ResType>) => {
      toast.success(res.data.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      if (onSuccess) onSuccess(res);
    },
    onError: (err) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
      if (onError) onError(err);
    }
  });
}