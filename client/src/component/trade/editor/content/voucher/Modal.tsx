import React, { useCallback } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '@app/redux/store';
import useSearcher from '@component/search/hook/useSearcher';
import Searcher from '@component/search/Searcher';
import TitleModal from '@component/modal/TitleModal';
import VoucherList from '@component/list/voucher/VoucherList';
import { State, Action } from '../../reducer';
import { ModalHook } from '@component/modal/useModal';

interface Props {
  modal: ModalHook;
  state: State;
  dispatch: React.Dispatch<Action>;
}

function Modal({ modal, state, dispatch }: Props) {
  const username = useAppSelector(state => state.auth.username);
  const searcher = useSearcher({
    defaultFilter: {
      voucherState: 'available',
    },
    defaultKeyword: [{ category: 'userName', title: '소유자', value: username, show: false }],
  });

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
    <TitleModal hook={modal} title="소유권 선택" css={{ width: '75vw' }}>
      <Searcher
        hook={searcher}
        options={{
          group: true,
          member: true,
        }}
      />

      {username && (
        <VoucherList hook={searcher} showOwner={false} icon={{ svg: faCheck }} handleSelect={onSelectVoucher} />
      )}
    </TitleModal>
  );
}

export default Modal;
