import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addMember } from '@api/api/member';
import { AxiosError, AxiosResponse } from 'axios';
import { ResponseError } from '@type/response';
import { getErrorMessage } from '@util/request';
import * as queryKey from '@api/queryKey';

interface BodyType {
  name: string;
}

interface ResType {
  message: string;
  memberId: number;
}

export default function useAddMember<TParam>(
  groupId: number,
  options?: UseMutationOptions<AxiosResponse<ResType>, AxiosError<ResponseError<TParam>>, BodyType>
) {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<ResType>, AxiosError<ResponseError<TParam>>, BodyType>({
    mutationFn: body => addMember(groupId, body),
    onSuccess: (res, variables, context) => {
      queryClient.invalidateQueries(queryKey.groupKeys.all);
      options?.onSuccess && options?.onSuccess(res, variables, context);
    },
    onError: (err, variables, context) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
      options?.onError && options?.onError(err, variables, context);
    },
  });
}
