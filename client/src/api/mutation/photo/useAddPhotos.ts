import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addPhotos } from '@api/api/photo';
import { AxiosError, AxiosResponse } from 'axios';
import { ResponseError } from "@type/response";
import { getErrorMessage } from '@util/request';

interface ResType { message: string; }

export default function useAddPhotos<TParam>(
  onSuccess?: (res: AxiosResponse<ResType>) => void,
  onError?: (err: AxiosError<ResponseError<TParam>, any>) => void
): 
UseMutationResult<
  AxiosResponse<ResType>,
  AxiosError<ResponseError<TParam>>,
  FormData
> {
  return useMutation(body => addPhotos(body), {
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