import React, { useEffect, useCallback } from 'react';
import { useAppSelector } from '@app/redux/reduxHooks';
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
  const { filter, keyword, filterDispatch, keywordDispatch } = useSearcher({ voucherState: 'available' });
  const username = useAppSelector(state => state.auth.username);

  // 로그인 한 사용자의 소유권만 보이도록 기본 키워드 추가
  useEffect(() => {
    keywordDispatch({
      type: 'ADD_KEYWORD',
      value: { category: 'userName', title: '소유자', value: username, show: false }
    });
  }, [username]);

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

      {username &&
      <VoucherList
        filter={filter}
        keyword={keyword}
        showOwner={false}
        icon={{ svg: faCheck }}
        handleSelect={onSelectVoucher}
      />}
    </TitleModal>
  );
}

export default ModalSection;