import React from 'react';
import useModal from '@hook/useModal';
import CardSection from './content/CardSection';
import ModalSection from './content/ModalSection';
import { State, Action } from '@page/user/shipping/writer/reducer';
import { StyledVoucherSection } from './_styles';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>
}

function VoucherSection({ state, dispatch }: Props) {
  const addModal = useModal();

  return (
    <StyledVoucherSection>
      <CardSection modal={addModal} state={state} dispatch={dispatch} />
      <ModalSection modal={addModal} state={state} dispatch={dispatch} />
    </StyledVoucherSection>
  );
}

export default VoucherSection;