import React, { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { ErrorType, getErrorMessage } from '@util/commonAPI';
import * as shippingAddressAPI from '@api/shippingAddressAPI';
import * as queryKey from '@util/queryKey';
import useModal from '@hook/useModal';
import ConfirmModal from '@component/modal/ConfirmModal';
import IconButton from '@component/form/IconButton';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { AddressType } from '@api/shippingAddressAPI';

interface AddressRemoveProps {
  address: AddressType;
  children?: React.ReactNode;
}
const AddressRemoveDefaultProps = {};

function AddressRemove({ address, children }: AddressRemoveProps & typeof AddressRemoveDefaultProps) {
  const removeModal = useModal();
  const queryClient = useQueryClient();

  // 데이터 삭제 요청
  const deleteMutation = useMutation(shippingAddressAPI.deleteShippingAddress.axios, {
    onSuccess: (res) => {
      toast.warning(res.data?.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      queryClient.invalidateQueries(queryKey.userKeys.address(address.user_id));
    },
    onError: (err: AxiosError<ErrorType>) => {
      removeModal.setErrorMessage(getErrorMessage(err));
    }
  })

  // 삭제 이벤트
  const handleRemove = useCallback(() => {
    deleteMutation.mutate(address.address_id);
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
        <p className="text"><i>{address.address} {address.address_detail}</i></p>
      </ConfirmModal>
    </>
  );
}

AddressRemove.defaultProps = AddressRemoveDefaultProps;
export default AddressRemove;