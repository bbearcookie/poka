import React, { useEffect, useReducer, useCallback } from 'react';
import qs from 'qs';
import BackLabel from '@component/label/BackLabel';
import VoucherSection from './content/VoucherSection';
import PhotocardSection from './content/PhotocardSection';
import { initialState, reducer } from './reducer';
import './Index.scss';

interface Props {}
const DefaultProps = {};

function Index({  }: Props) {
  const querystring = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const voucherId = Number(querystring.voucherId) || 0;
  const [form, formDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    formDispatch({ type: 'SET_VOUCHER_ID', payload: voucherId });
  }, [voucherId]);

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="TradeWriterPage">
      <h1 className="title-label">교환글 등록</h1>
      <form onSubmit={onSubmit}>
        <VoucherSection form={form} formDispatch={formDispatch} />
        <PhotocardSection form={form} formDispatch={formDispatch} />
      </form>
    </div>
  );
}

export default Index;