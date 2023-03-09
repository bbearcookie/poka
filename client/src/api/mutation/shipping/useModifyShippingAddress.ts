import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ResponseError } from "@type/response";
import { getErrorMessage } from '@util/request';
import * as queryKey from '@api/queryKey';
import { modifyShippingAddress } from '@api/api/shipping';

export interface ParamType {
  addressId: number;
  body: {
    address: {
      name: string;
      recipient: string;
      contact: string;
      postcode: string;
      address: string;
      addressDetail: string;
      requirement: string;
    }
  };
}

interface ResType { message: string; }

export default function useModifyShippingAddress<TParam>(
  userId: number,
  onSuccess?: (res: AxiosResponse<ResType>) => void,
  onError?: (err: AxiosError<ResponseError<TParam>, any>) => void
): 
UseMutationResult<
  AxiosResponse<ResType>,
  AxiosError<ResponseError<TParam>>,
  ParamType
> {
  const queryClient = useQueryClient();

  return useMutation(modifyShippingAddress, {
    onSuccess: (res: AxiosResponse<ResType>) => {
      toast.success(res.data.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      queryClient.invalidateQueries(queryKey.userKeys.address(userId));
      queryClient.invalidateQueries(queryKey.addressKeys.all);
      if (onSuccess) onSuccess(res);
    },
    onError: (err) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
      if (onError) onError(err);
    },
  })
}