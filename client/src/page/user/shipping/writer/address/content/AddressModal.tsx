import React, { useCallback } from 'react';
import { ModalHook } from '@component/new_modal/useModal';
import TitleModal from '@component/new_modal/TitleModal';
import Button from '@component/form/Button';
import Address from '@component/shipping/address/item/Address';
import { ResType } from '@api/query/shipping/useShippingAddressesQuery';
import { State, Action } from '@component/shipping/address/editor/reducer';
import { StyledButtonSection } from '../../_styles';

interface Props {
  addresses: ResType;
  modal: ModalHook;
  state: State;
  dispatch: React.Dispatch<Action>;
}

function AddressModal({ addresses, modal, state, dispatch }: Props) {

  // 주소 가져오기
  const applyAddress = useCallback((idx: number) => {
    dispatch({ type: "SET_FORM", form: addresses.addresses[idx] });
    dispatch({ type: "INIT_MESSAGE" });
    modal.close();
  }, [addresses, dispatch, modal]);

  return (
    <TitleModal hook={modal} title="배송지 가져오기">
      {addresses.addresses.map((address, idx) =>
      <Address key={address.addressId} {...address}>
        <StyledButtonSection>
          <Button
            styles={{
              height: "fit-content",
              theme: "primary",
              marginTop: "0.5em",
              padding: "0.7em 1em",
              iconMargin: "1em"
            }}
            onClick={() => applyAddress(idx)}
          >적용</Button>
        </StyledButtonSection>
      </Address>)}
    </TitleModal>
  );
}

export default AddressModal;