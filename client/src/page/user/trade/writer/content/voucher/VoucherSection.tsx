import React from 'react';
import useModal from '@hook/useModal';
import { State as FormState, Action as FormAction } from '../../reducer';
import CardSection from './CardSection';
import ModalSection from './ModalSection';

interface Props {
  form: FormState;
  formDispatch: React.Dispatch<FormAction>;
}

function VoucherSection({ form, formDispatch }: Props) {
  const addModal = useModal();

  return (
    <section className="voucher-section">
      <CardSection addModal={addModal} form={form} formDispatch={formDispatch} />
      <ModalSection addModal={addModal} form={form} formDispatch={formDispatch} />
    </section>
  );
}

export default VoucherSection;