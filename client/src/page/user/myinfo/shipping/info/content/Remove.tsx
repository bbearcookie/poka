import { useCallback } from 'react';
import useDeleteShippingAddress from '@api/mutation/shipping/address/useDeleteShippingAddress';
import useModal from '@component/modal/useModal';
import ConfirmModal from '@component/modal/ConfirmModal';
import IconButton from '@component/form/IconButton';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Address } from '@type/shipping';

interface Props extends Address {}

function Remove({ addressId, name, address, addressDetail }: Props) {
  const modal = useModal();

  // 데이터 삭제 요청
  const deleteMutation = useDeleteShippingAddress(addressId);

  // 삭제 이벤트
  const handleRemove = useCallback(() => {
    deleteMutation.mutate({ addressId });
  }, [addressId, deleteMutation]);

  return (
    <>
      <IconButton
        width="1em"
        height="1em"
        icon={faClose}
        tooltip="삭제"
        onClick={e => {
          e.stopPropagation();
          modal.open();
        }}
        styles={{ display: 'inline' }}
      />

      <ConfirmModal
        hook={modal}
        title="배송지 삭제"
        confirm={{ text: '삭제', buttonTheme: "danger", onClick: handleRemove }}
      >
        <p className="text">
          정말로 <b>{name}</b> 배송지를 삭제하시겠어요?
        </p>
        <p className="text">
          <i>
            {address} {addressDetail}
          </i>
        </p>
      </ConfirmModal>
    </>
  );
}

export default Remove;
