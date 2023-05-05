import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ResponseError } from '@type/response';
import { getErrorMessage } from '@util/request';
import { modifyPhoto } from '@api/api/photo';
import * as queryKey from '@api/queryKey';

interface BodyType {
  name: string;
  groupId: number;
  memberId: number;
  image: File | null;
}

interface ResType {
  message: string;
}

export default function useModifyPhoto<TParam>(
  photocardId: number,
  options?: UseMutationOptions<AxiosResponse<ResType>, AxiosError<ResponseError<TParam>>, BodyType>
) {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<ResType>, AxiosError<ResponseError<TParam>>, BodyType>({
    ...options,
    mutationFn: body => modifyPhoto(photocardId, body),
    onSuccess: (res, variables, context) => {
      toast.success(res.data.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      queryClient.invalidateQueries(queryKey.photoKeys.all);
      options?.onSuccess && options?.onSuccess(res, variables, context);
    },
    onError: (err, variables, context) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
      options?.onError && options?.onError(err, variables, context);
    },
  });
}
