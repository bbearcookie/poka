import React, { useState, useCallback } from 'react';
import useVoucherQuery from '@api/query/voucher/useVoucherQuery';
import useNewVouchersQuery from '@api/query/voucher/useNewVouchersQuery';
import useModal from '@hook/useModal';
import useSearcher from '@component/search/useSearcher';
import { getErrorMessage } from '@util/request';
import * as queryKey from '@api/queryKey';
import { State as FormState, Action as FormAction } from '../../reducer';
import CardSection from './CardSection';
import ModalSection from './ModalSection';

interface Props {
  form: FormState;
  formDispatch: React.Dispatch<FormAction>;
}

function VoucherSection({ form, formDispatch }: Props) {
  const addModal = useModal();
  const { filter, keyword, filterDispatch, keywordDispatch } = useSearcher({ voucherState: 'available' });

  // const { status, data: voucher, error } = useVoucherQuery(form.data.haveVoucherId, {
  //   queryKey: queryKey.tradeKeys.writerVoucher(form.data.haveVoucherId),
  //   refetchOnWindowFocus: false,
  //   retry: false,
  //   onError: (err) => {
  //     formDispatch({ type: "SET_MESSAGE", target: 'haveVoucherId', value: getErrorMessage(err) });
  //   }
  // });

  // 사용할 소유권 선택
  const onSelectVoucher = useCallback((voucherId: number) => {
    formDispatch({ type: 'SET_VOUCHER_ID', payload: voucherId });
    formDispatch({ type: "SET_MESSAGE", target: 'haveVoucherId', value: '' });
    addModal.close();
  }, [formDispatch, addModal]);

  return (
    <section className="voucher-section">
      <CardSection addModal={addModal} form={form} formDispatch={formDispatch} />
      <ModalSection addModal={addModal} form={form} formDispatch={formDispatch} />
    </section>
  );
}

export default VoucherSection;