import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addGroup } from '@api/api/group';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from '@util/request';
import { getErrorMessage } from '@util/request';

export interface ParamType {
  body: {
    
  }
}

interface ResType { message: string; }

// export default function useAddPhotos<TParam>(
//   onSuccess?: (res: AxiosResponse<ResType>) => void,
//   onError?: (err: AxiosError<ErrorType<TParam>, any>) => void
// ): 
// UseMutationResult<
//   AxiosResponse<ResType>,
//   AxiosError<ErrorType<TParam>>,
//   ParamType
// > {
//   return useMutation(addGroup, {
//     onSuccess: (res: AxiosResponse<ResType>) => {
//       toast.success(res.data.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
//       if (onSuccess) onSuccess(res);
//     },
//     onError: (err) => {
//       toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
//       if (onError) onError(err);
//     }
//   });
// }