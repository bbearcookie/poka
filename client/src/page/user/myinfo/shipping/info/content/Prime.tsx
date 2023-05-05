import { useCallback } from 'react';
import useChangePrimeAddress from '@api/mutation/shipping/address/useChangePrimeAddress';
import IconButton from '@component/form/iconButton/IconButton';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

interface Props {
  addressId: number;
}

function Prime({ addressId }: Props) {
  // 기본 배송지 수정 요청
  const patchMutation = useChangePrimeAddress(addressId);

  // 클릭 이벤트
  const handleClick = useCallback(() => {
    patchMutation.mutate();
  }, [patchMutation]);

  return (
    <IconButton
      iconProps={{ icon: faHouse, width: '1em', height: '1em' }}
      tooltip="기본 배송지로 설정"
      onClick={handleClick}
    />
  );
}

export default Prime;
