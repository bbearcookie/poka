import React from 'react';
import useShippingAddresses from '@api/query/shipping/useShippingAddressesQuery';
import useModal from '@component/modal/useModal';
import { useAppSelector } from '@app/redux/store';
import { State, Action } from '@component/shipping/address/editor/reducer';
import AddressCard from './content/AddressCard';
import AddressModal from './content/AddressModal';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function AddressSection({ state, dispatch }: Props) {
  const addressModal = useModal();
  const { userId } = useAppSelector(state => state.auth);

  const { status, data: addresses } = useShippingAddresses(userId, {
    onSuccess: res => {
      dispatch({
        type: 'SET_FORM',
        form: {
          ...res.addresses[0],
          name: '배송지',
        },
      });
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <AddressCard modal={addressModal} state={state} dispatch={dispatch} />
      {status === 'success' && (
        <AddressModal addresses={addresses} modal={addressModal} state={state} dispatch={dispatch} />
      )}
    </>
  );
}

export default AddressSection;
