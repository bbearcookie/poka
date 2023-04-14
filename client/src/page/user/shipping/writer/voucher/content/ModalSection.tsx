import React, { useEffect, useCallback } from 'react';
import { useAppSelector } from '@app/redux/store';
import useSearcher from '@component/search/hook/useSearcher';
import Searcher from '@component/search/Searcher';
import VoucherList from '@component/list/voucher/VoucherList';
import TitleModal from '@component/modal/TitleModal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModalHook } from '@component/modal/useModal';
import { State, Action } from '@page/user/shipping/writer/reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  modal: ModalHook;
}

function ModalSection({ state, dispatch, modal }: Props) {
  const username = useAppSelector(state => state.auth.username);
  const searcher = useSearcher({
    defaultFilter: {
      voucherState: 'available',
    },
    defaultKeyword: [{ category: 'userName', title: '소유자', value: username, show: false }],
  });

  // 사용할 소유권 선택
  const onSelectVoucher = useCallback(
    (id: number) => {
      if (!state.data.voucherIds.includes(id)) {
        dispatch({ type: 'SET_VOUCHER_ID', voucherIds: state.data.voucherIds.concat(id) });
        dispatch({ type: 'SET_MESSAGE', target: 'voucherIds', value: '' });
      }
    },
    [state, dispatch]
  );

  return (
    <TitleModal hook={modal} title="소유권 선택" css={{ width: '75vw' }}>
      <Searcher
        options={{
          group: true,
          member: true,
        }}
        hook={searcher}
      />

      {username && (
        <VoucherList
          hook={searcher}
          showOwner={false}
          excludeVoucherIds={state.data.voucherIds}
          icon={{ svg: faPlus }}
          handleSelect={onSelectVoucher}
        />
      )}
    </TitleModal>
  );
}

export default ModalSection;
