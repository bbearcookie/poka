import React, { useEffect, useCallback } from 'react';
import { useAppSelector } from '@app/redux/reduxHooks';
import useSearcher from '@component/search/useSearcher';
import Searcher from '@component/search/Searcher';
import VoucherList from '@component/list/voucher/VoucherList';
import TitleModal from '@component/modal/TitleModal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModalHookType } from '@hook/useModal';
import { State, Action } from '@page/user/shipping/writer/reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  modal: ModalHookType;
}

function ModalSection({ state, dispatch, modal }: Props) {
  const { filter, keyword, filterDispatch, keywordDispatch } = useSearcher({ voucherState: 'available' });
  const username = useAppSelector(state => state.auth.username);

  // 로그인 한 사용자의 소유권만 보이도록 기본 키워드 추가
  useEffect(() => {
    keywordDispatch({
      type: 'ADD_KEYWORD',
      value: { category: 'userName', title: '소유자', value: username, show: false }
    });
  }, [username, keywordDispatch]);

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

      {username &&
      <VoucherList
        filter={filter}
        keyword={keyword}
        showOwner={false}
        excludeVoucherIds={state.data.voucherIds}
        icon={{ svg: faPlus }}
        handleSelect={onSelectVoucher}
      />}
    </TitleModal>
  );
}

export default ModalSection;