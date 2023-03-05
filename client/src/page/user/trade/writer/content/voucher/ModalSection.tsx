import React, { useCallback } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ModalHookType } from '@hook/useModal';
import TitleModal from '@component/modal/TitleModal';
import useSearcher from '@component/search/useSearcher';
import Searcher from '@component/search/Searcher';
import VoucherList from '@component/list/VoucherList';
import { State as FormState, Action as FormAction } from '../../reducer';

interface Props {
  form: FormState;
  formDispatch: React.Dispatch<FormAction>;
  addModal: ModalHookType;
}

function ModalSection({ form, formDispatch, addModal }: Props) {
  const { filter, keyword, filterDispatch, keywordDispatch } = useSearcher(
    { voucherState: 'available' },
  );
  // TODO: username이 자기아이디 인것만 보여주게 하기

  // 사용할 소유권 선택
  const onSelectVoucher = useCallback((voucherId: number) => {
    formDispatch({ type: 'SET_VOUCHER_ID', payload: voucherId });
    formDispatch({ type: "SET_MESSAGE", target: 'haveVoucherId', value: '' });
    addModal.close();
  }, [formDispatch, addModal]);

  return (
    <TitleModal hook={addModal} titleName="소유권 선택" styles={{ width: "75%" }}>
      <Searcher
        options={{
          group: true,
          member: true
        }}
        filter={filter}
        keyword={keyword}
        filterDispatch={filterDispatch}
        keywordDispatch={keywordDispatch}
      />

      <VoucherList
        filter={filter}
        keyword={keyword}
        showOwner={false}
        icon={{ svg: faCheck }}
        handleSelect={onSelectVoucher}
      />

      {/* <VoucherListCard
        icon={{ svg: faCheck, tooltip: "선택" }}
        handleSelect={onSelectVoucher}
        defaultFilter={{
          owner: "mine",
          state: "available",
          excludeVoucherId: []
        }}
        cardStyles={{ border: "none" }}
      /> */}
    </TitleModal>
  );
}

export default ModalSection;