import React, { useEffect, useReducer, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useTradeQuery from '@api/query/trade/useTradeQuery';
import useModifyTrade from '@api/mutation/trade/useModifyTrade';
import { initialState, reducer, FormType } from './reducer';
import Component from './Component';
import './Index.scss';

interface Props {

}
const DefaultProps = {};

function EditorIndex({  }: Props) {
  const { tradeId } = useParams();
  const [form, formDispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const { data: trade, status } = useTradeQuery(Number(tradeId) || 0);

  const putMutation = useModifyTrade<keyof FormType>(
    (res) => navigate(`/trade/detail/${tradeId}`),
    (err) => {
      err.response?.data.errors.forEach(item => {
        formDispatch({ type: 'SET_MESSAGE', target: item.param, value: item.message });
      });
    }
  )

  useEffect(() => {
    if (!trade) return;
    formDispatch({ type: 'SET_AMOUNT', payload: trade.amount });
    formDispatch({ type: 'SET_VOUCHER_ID', payload: trade.voucher_id });
    trade.wantcards.forEach(item => {
      formDispatch({ type: 'ADD_WANT_PHOTOCARD_ID', payload: item.photocard_id });
    })
  }, [trade]);

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    putMutation.mutate({
      tradeId: Number(tradeId),
      body: {
        haveVoucherId: form.data.haveVoucherId,
        wantPhotocardIds: form.data.wantPhotocardIds,
        amount: form.data.amount
      }
    });
  }, [form, putMutation, tradeId]);

  return (
    <Component
      titleText="수정"
      form={form}
      formDispatch={formDispatch}
      onSubmit={onSubmit}
    />
  );
}

export default EditorIndex;