import React, { useCallback } from 'react';
import useDeleteShippingAddress from '@api/mutation/address/useDeleteShippingAddress';
import useModal from '@hook/useModal';
import ConfirmModal from '@component/modal/ConfirmModal';
import IconButton from '@component/form/IconButton';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ShippingAddressType } from '@type/user';

interface Props {
  address: ShippingAddressType;
}
const DefaultProps = {};

function AddressRemove({ address }: Props) {
  const removeModal = useModal();

  // 데이터 삭제 요청
  const deleteMutation = useDeleteShippingAddress(address.userId);

  // 삭제 이벤트
  const handleRemove = useCallback(() => {
    deleteMutation.mutate({ addressId: address.addressId});
  }, [address, deleteMutation]);

  return (
    <>
      <IconButton
        width="1em"
        height="1em"
        icon={faClose}
        tooltip="삭제"
        onClick={(e) => { e.stopPropagation(); removeModal.open(); }}
        styles={{ display: 'inline' }}
      />

      <ConfirmModal
        hook={removeModal}
        titleName="배송지 삭제"
        confirmText="삭제"
        handleConfirm={handleRemove}
      >
        <p className="text">정말로 <b>{address.name}</b> 배송지를 삭제하시겠어요?</p>
        <p className="text"><i>{address.address} {address.addressDetail}</i></p>
      </ConfirmModal>
    </>
  );
}

export default AddressRemove;