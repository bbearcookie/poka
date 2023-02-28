import React, { useCallback } from 'react';
import TitleModal from '@component/modal/TitleModal';
import VoucherListCard from '@component/list/voucher/VoucherListCard';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModalHookType } from '@hook/useModal';
import { State, Action } from '../../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  modal: ModalHookType;
}
const DefaultProps = {};

function ModalSection({ state, dispatch, modal }: Props) {

  // 사용할 소유권 선택
  const onSelectVoucher = useCallback((id: number) => {
    if (!state.data.voucherIds.includes(id))
    dispatch({ type: 'SET_VOUCHER_ID', voucherIds: state.data.voucherIds.concat(id)});
    dispatch({ type: "SET_MESSAGE", target: "voucherIds", value: ""});
  }, [state, dispatch]);

  return (
    <TitleModal hook={modal} titleName="소유권 선택" styles={{ width: "75%" }} cardBodyStyles={{ minHeight: "100vh" }}>
      {modal.show &&
      <VoucherListCard
        icon={{ svg: faPlus, tooltip: '선택' }}
        handleSelect={onSelectVoucher}
        defaultFilter={{
          owner: "mine",
          state: "available",
          excludeVoucherId: state.data.voucherIds
        }}
        cardStyles={{ border: "none" }}
      />}
    </TitleModal>
  );
}

export default ModalSection;