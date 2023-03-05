import React from 'react';
import useModal from '@hook/useModal';
import CardSection from './CardSection';
import ModalSection from './ModalSection';
import { State, Action } from '../../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>
}

function VoucherSection({ state, dispatch }: Props) {
  const addModal = useModal();

  return (
    <section className="voucher-section">
      <CardSection modal={addModal} state={state} dispatch={dispatch} />
      <ModalSection modal={addModal} state={state} dispatch={dispatch} />
    </section>
  );
}

export default VoucherSection;