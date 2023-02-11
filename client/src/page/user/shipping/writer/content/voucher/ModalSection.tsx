import React, { useCallback } from 'react';
import TitleModal from '@component/modal/TitleModal';
import VoucherListCard from '@component/list/voucher/VoucherListCard';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ModalHookType } from '@hook/useModal';

interface Props {
  modal: ModalHookType;
  voucherIds: number[];
  setVoucherIds: React.Dispatch<React.SetStateAction<number[]>>;
}
const DefaultProps = {};

function ModalSection({ modal, voucherIds, setVoucherIds }: Props) {

  // 사용할 소유권 선택
  const onSelectVoucher = useCallback((id: number) => {
    if (!voucherIds.includes(id)) setVoucherIds(voucherIds.concat(id));
  }, [voucherIds, setVoucherIds]);

  return (
    <TitleModal hook={modal} titleName="소유권 선택" styles={{ width: "75%" }}>
      <VoucherListCard
        icon={faCheck}
        handleClickIcon={onSelectVoucher}
        defaultFilter={{
          owner: "mine",
          state: "available",
          excludeVoucherId: voucherIds
        }}
        cardStyles={{ border: "none" }}
      />
    </TitleModal>
  );
}

export default ModalSection;