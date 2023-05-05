import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ResponseError } from '@type/response';
import { getErrorMessage } from '@util/request';
import * as queryKey from '@api/queryKey';
import { modifyShippingAddress } from '@api/api/shipping/address';

interface BodyType {
  address: {
    name: string;
    recipient: string;
    contact: string;
    postcode: string;
    address: string;
    addressDetail: string;
    requirement: string;
  };
}

interface ResType {
  message: string;
}

export default function useModifyShippingAddress<TParam>(
  addressId: number,
  options?: Omit<
    UseMutationOptions<AxiosResponse<ResType>, AxiosError<ResponseError<TParam>>, BodyType, unknown>,
    'mutationFn'
  >
) {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<ResType>, AxiosError<ResponseError<TParam>>, BodyType>({
    mutationFn: body => modifyShippingAddress(addressId, body),
    onSuccess: (res, variables, context) => {
      toast.success(res.data.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      queryClient.invalidateQueries(queryKey.addressKeys.all);
      options?.onSuccess && options?.onSuccess(res, variables, context);
    },
    onError: (err, variables, context) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
      options?.onError && options?.onError(err, variables, context);
    },
  });
}
