import { useRef } from 'react';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from '@util/request';
import { getErrorMessage } from '@util/request';
import * as queryKey from '@api/queryKey';
import { modifyShippingAddress } from '@api/api/address';

export interface ParamType {
  addressId: number;
  body: {
    name: string;
    recipient: string;
    contact: string;
    postcode: string;
    address: string;
    address_detail: string;
    requirement: string;
  }
}

interface ResType { message: string; }

export default function useModifyShippingAddress<TParam>(
  userId: number,
  onSuccess?: (res: AxiosResponse<ResType>) => void,
  onError?: (err: AxiosError<ErrorType<TParam>, any>) => void
): 
UseMutationResult<
  AxiosResponse<ResType>,
  AxiosError<ErrorType<TParam>>,
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