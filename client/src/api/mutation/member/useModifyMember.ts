import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { modifyMember } from '@api/api/member';
import { AxiosError, AxiosResponse } from 'axios';
import { ResponseError } from '@type/response';
import { getErrorMessage } from '@util/request';
import * as queryKey from '@api/queryKey';

interface BodyType {
  name: string;
}

interface ResType {
  message: string;
  groupId: number;
  memberId: number;
}

export default function useModifyMember<TParam>(
  memberId: number,
  options?: Omit<
    UseMutationOptions<AxiosResponse<ResType>, AxiosError<ResponseError<TParam>>, BodyType, unknown>,
    'mutationFn'
  >
) {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<ResType>, AxiosError<ResponseError<TParam>>, BodyType>(
    body => modifyMember(memberId, body),
    {
      onSuccess: (res, variables, context) => {
        queryClient.invalidateQueries(queryKey.groupKeys.all);
        queryClient.invalidateQueries(queryKey.memberKeys.all);
        options?.onSuccess && options?.onSuccess(res, variables, context);
      },
      onError: (err, variables, context) => {
        toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
        options?.onError && options?.onError(err, variables, context);
      },
    }
  );
}
