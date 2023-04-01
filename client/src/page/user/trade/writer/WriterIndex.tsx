import React, { useReducer, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import produce from 'immer';
import qs from 'qs';
import useAddTrade from '@api/mutation/trade/useAddTrade';
import Component from './Component';
import { initialState, reducer, FormType } from './reducer';
import './Index.scss';

function WriterIndex() {
  const querystring = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const voucherId = Number(querystring.voucherId) || 0;
  const [form, formDispatch] = useReducer(
    reducer,
    initialState,
    produce(draft => {
      draft.data.haveVoucherId = voucherId;
    })
  );
  const navigate = useNavigate();

  const postMutation = useAddTrade<keyof FormType>(
    res => navigate('/trade/list'),
    err => {
      err.response?.data.errors.forEach(item => {
        formDispatch({ type: 'SET_MESSAGE', target: item.param, value: item.message });
      });
    }
  );

  const onSubmit = useCallback(() => {
    // postMutation.mutate({
    //   voucherId: form.data.haveVoucherId,
    //   wantPhotocardIds: form.data.wantPhotocardIds,
    //   amount: form.data.amount,
    // });
  }, [form, postMutation]);

  return <Component titleText="등록" form={form} formDispatch={formDispatch} onSubmit={onSubmit} />;
}

export default WriterIndex;
