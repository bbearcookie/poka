import React from 'react';
import useShippingAddresses from '@api/query/shipping/useShippingAddressesQuery';
import useModal from '@hook/useModal';
import { useAppSelector } from '@app/redux/reduxHooks';
import { State, Action } from '@component/shipping/address/editor/reducer';
import AddressCard from './AddressCard';
import AddressModal from './AddressModal';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function AddressSection({ state, dispatch }: Props) {
  const addressModal = useModal();
  const { userId } = useAppSelector(state => state.auth);
  const { status, data: addresses, error } = useShippingAddresses(userId);
  
  return (
    <section className="address-section">
      <AddressCard modal={addressModal} state={state} dispatch={dispatch} />
      {status === "success" && <AddressModal addresses={addresses} modal={addressModal} state={state} dispatch={dispatch} />}
    </section>
  );
}

export default AddressSection;