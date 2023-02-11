import React, { useCallback } from 'react';
import useModal from '@hook/useModal';
import CardSection from './CardSection';
import ModalSection from './ModalSection';

interface Props {
  voucherIds: number[];
  setVoucherIds: React.Dispatch<React.SetStateAction<number[]>>;
}
const DefaultProps = {};

function VoucherSection({ voucherIds, setVoucherIds }: Props) {
  const addModal = useModal();

  return (
    <section className="voucher-section">
      <CardSection modal={addModal} voucherIds={voucherIds} setVoucherIds={setVoucherIds} />
      <ModalSection modal={addModal} voucherIds={voucherIds} setVoucherIds={setVoucherIds} />
    </section>
  );
}

export default VoucherSection;