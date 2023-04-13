import React, { useCallback, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import produce from 'immer';
import qs from 'qs';
import {
  reducer as addressReducer,
  initialState as AddressInitState,
  FormType as AddressFormType,
} from '@component/shipping/address/editor/reducer';
import useAddShippingRequest from '@api/mutation/shipping/request/useAddShippingRequest';
import TitleLabel from '@component/label/TitleLabel';
import VoucherSection from './voucher/VoucherSection';
import AddressSection from './address/AddressSection';
import ButtonSection from './button/ButtonSection';
import reducer, { initialState, FormType } from './reducer';
import { StyledIndex } from './_styles';

function Index() {
  const querystring = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  const [state, dispatch] = useReducer(
    reducer,
    produce(initialState, draft => {
      if (Number(querystring.voucherId)) draft.data.voucherIds = [Number(querystring.voucherId)];
    })
  );

  const [addressState, addressDispatcher] = useReducer(
    addressReducer,
    produce(AddressInitState, draft => {
      draft.form.name = '배송지';
    })
  );

  const navigate = useNavigate();

  // 작성 요청
  const addMutation = useAddShippingRequest<string>(
    res => navigate(`/shipping/detail/${res.data.requestId}`),
    err => {
      err.response?.data.errors.forEach(e => {
        if (e.param.substring(0, 8) === 'address.') {
          addressDispatcher({
            type: 'SET_MESSAGE',
            target: e.param.substring(8) as keyof AddressFormType,
            value: e.message,
          });
        } else {
          dispatch({ type: 'SET_MESSAGE', target: e.param as keyof FormType, value: e.message });
        }
      });
    }
  );

  // 등록 이벤트
  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      addMutation.mutate({
        voucherIds: state.data.voucherIds,
        address: addressState.form,
      });
    },
    [addMutation, state, addressState]
  );

  return (
    <StyledIndex>
      <TitleLabel title="소유권 배송 요청" css={{ marginBottom: '1em' }} />
      <form onSubmit={onSubmit}>
        <VoucherSection state={state} dispatch={dispatch} />
        <AddressSection state={addressState} dispatch={addressDispatcher} />
        <ButtonSection />
      </form>
    </StyledIndex>
  );
}

export default Index;
