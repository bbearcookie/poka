import React, { useEffect, useCallback } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '@app/redux/reduxHooks';
import useSearcher from '@component/search/useSearcher';
import Searcher from '@component/search/Searcher';
import TitleModal from '@component/modal/TitleModal';
import VoucherList from '@component/list/voucher/VoucherList';
import { State, Action } from '../../reducer';
import { ModalHookType } from '@hook/useModal';

interface Props {
  modal: ModalHookType;
  state: State;
  dispatch: React.Dispatch<Action>;
}

function Modal({ modal, state, dispatch }: Props) {
  const { filter, keyword, filterDispatch, keywordDispatch } = useSearcher({
    voucherState: 'available',
  });

  const username = useAppSelector(state => state.auth.username);

  // 로그인 한 사용자의 소유권만 보이도록 기본 키워드 추가
  useEffect(() => {
    keywordDispatch({
      type: 'ADD_KEYWORD',
      value: { category: 'userName', title: '소유자', value: username, show: false },
    });
  }, [username, keywordDispatch]);

  // 사용할 소유권 선택
  const onSelectVoucher = useCallback(
    (voucherId: number) => {
      dispatch({ type: 'SET_VOUCHER_ID', payload: voucherId });
      dispatch({ type: 'SET_MESSAGE', target: 'voucherId', value: '' });
      modal.close();
    },
    [modal, dispatch]
  );

  return (
    <TitleModal hook={modal} titleName="소유권 선택" styles={{ width: '75%' }}>
      <Searcher
        options={{
          group: true,
          member: true,
        }}
        filter={filter}
        keyword={keyword}
        filterDispatch={filterDispatch}
        keywordDispatch={keywordDispatch}
      />

      {username && (
        <VoucherList
          filter={filter}
          keyword={keyword}
          showOwner={false}
          icon={{ svg: faCheck }}
          handleSelect={onSelectVoucher}
        />
      )}
    </TitleModal>
  );
}

export default Modal;
