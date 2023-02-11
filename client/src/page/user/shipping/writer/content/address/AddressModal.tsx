import React, { useCallback } from 'react';
import { ModalHookType } from '@hook/useModal';
import TitleModal from '@component/modal/TitleModal';
import Button from '@component/form/Button';
import Address from '@component/address/Address';
import { ResType } from '@api/query/shipping/useShippingAddresses';
import { State, Action } from '@component/address/editor/reducer';

interface Props {
  addresses: ResType;
  modal: ModalHookType;
  state: State;
  dispatch: React.Dispatch<Action>;
}
const DefaultProps = {};

function AddressModal({ addresses, modal, state, dispatch }: Props) {

  const applyAddress = useCallback((idx: number) => {
    console.log(addresses.addresses[idx]);
    dispatch({ type: "SET_FORM", form: addresses.addresses[idx] });
    modal.close();
  }, [addresses, dispatch, modal]);

  return (
    <TitleModal hook={modal} titleName="배송지 가져오기" cardBodyStyles={{ padding: "0" }} styles={{ minWidth: "50%" }}>
      {addresses.addresses.map((address, idx) =>
      <Address
        key={address.addressId}
        address={address}
      >
        <section className="button-section">
          <Button
            styles={{
              height: "fit-content",
              theme: "primary",
              marginTop: "0.5em",
              padding: "0.7em 1em",
              iconMargin: "1em"
            }}
            onClick={() => applyAddress(idx)}
          >
            적용
          </Button>
        </section>
      </Address>)}
    </TitleModal>
  );
}

export default AddressModal;