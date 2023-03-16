import React, { useCallback } from 'react';
import useChangePrimeAddress from '@api/mutation/shipping/address/useChangePrimeAddress';
import IconButton from '@component/form/IconButton';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { Address } from '@type/shipping';

interface Props {
  address: Address;
}

function AddressPrime({ address }: Props) {

  // 기본 배송지 수정 요청
  const patchMutation = useChangePrimeAddress(address.addressId);

  // 클릭 이벤트
  const handleClick = useCallback(() => {
    patchMutation.mutate({ });
  }, [patchMutation]);

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