import React, { useCallback } from 'react';
import useSearcher from '@component/search/useSearcher';
import Searcher from '@component/search/Searcher';
import TitleModal from '@component/modal/TitleModal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModalHookType } from '@hook/useModal';
import { State, Action } from '../../reducer';
import VoucherList from '@component/list/VoucherList';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  modal: ModalHookType;
}

function ModalSection({ state, dispatch, modal }: Props) {
  const { filter, keyword, filterDispatch, keywordDispatch } = useSearcher({ voucherState: 'available' });

  // 사용할 소유권 선택
  const onSelectVoucher = useCallback((id: number) => {
    if (!state.data.voucherIds.includes(id)) {
      dispatch({ type: 'SET_VOUCHER_ID', voucherIds: state.data.voucherIds.concat(id)});
      dispatch({ type: "SET_MESSAGE", target: "voucherIds", value: ""});
    }
  }, [state, dispatch]);

  return (
    <TitleModal hook={modal} titleName="소유권 선택" styles={{ width: "75%" }} cardBodyStyles={{ minHeight: "100vh" }}>
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
        excludeVoucherId={state.data.voucherIds}
        icon={{ svg: faPlus }}
        handleSelect={onSelectVoucher}
      />
    </TitleModal>
  );
}

export default ModalSection;