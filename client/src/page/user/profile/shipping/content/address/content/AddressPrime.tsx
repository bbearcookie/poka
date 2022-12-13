import React, { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { ErrorType, getErrorMessage } from '@util/request';
import * as shippingAddressAPI from '@api/shippingAddressAPI';
import * as queryKey from '@util/queryKey';
import IconButton from '@component/form/IconButton';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { AddressType } from '@api/shippingAddressAPI';

interface Props {
  address: AddressType;
}
const DefaultProps = {};

function AddressPrime({ address }: Props) {
  const queryClient = useQueryClient();

  // 기본 배송지 수정 요청
  const patchMutation = useMutation(shippingAddressAPI.patchShippingAddressPrime.axios, {
    onSuccess: (res) => {
      toast.success(res.data?.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      queryClient.invalidateQueries(queryKey.userKeys.address(address.user_id));
    },
    onError: (err: AxiosError<ErrorType>) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
    }
  });

  // 클릭 이벤트
  const handleClick = useCallback(() => {
    patchMutation.mutate(address.address_id);
  }, [patchMutation, address]);

  return (
    <IconButton
      width="1em"
      height="1em"
      icon={faHouse}
      tooltip="기본 배송지로 설정"
      styles={{ display: 'inline' }}
      onClick={handleClick}
    />
  );
}

export default AddressPrime;