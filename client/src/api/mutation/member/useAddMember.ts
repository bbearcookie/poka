import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addMember } from '@api/api/member';
import { AxiosError, AxiosResponse } from 'axios';
import { ResponseError } from "@type/response";
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
  onSuccess?: (res: AxiosResponse<ResType>) => void,
  onError?: (err: AxiosError<ResponseError<TParam>, any>) => void
): 
UseMutationResult<
  AxiosResponse<ResType>,
  AxiosError<ResponseError<TParam>>,
  BodyType
> {
  const queryClient = useQueryClient();

  return useMutation(body => addMember(groupId, body), {
    onSuccess: (res: AxiosResponse<ResType>) => {
      queryClient.invalidateQueries(queryKey.groupKeys.all);
      queryClient.invalidateQueries(queryKey.groupKeys.detail(groupId));
      if (onSuccess) onSuccess(res);
    },
    onError: (err) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
      if (onError) onError(err);
    }
  });
}