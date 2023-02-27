import React, { useCallback, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import produce from 'immer';
import qs from 'qs';
import addressReducer, { initialState as AddressInitState, FormType as AddressFormType } from '@component/address/editor/reducer';
import useAddShippingRequest from '@api/mutation/shipping/useAddShippingRequest';
import VoucherSection from './content/voucher/VoucherSection';
import AddressSection from './content/address/Index';
import ButtonSection from './content/ButtonSection';
import reducer, { initialState, FormType } from './reducer';
import './Index.scss';

interface Props {

}
const DefaultProps = {};

function Index({  }: Props) {
  const querystring = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const [state, dispatch] = useReducer(reducer, produce(initialState, draft => {
    if (Number(querystring.voucherId)) draft.data.voucherIds = [Number(querystring.voucherId)];
  }));
  const [addressState, addressDispatcher] = useReducer(addressReducer, produce(AddressInitState, draft => {
    draft.form.name = "배송지"
  }));
  const navigate = useNavigate();

  // 작성 요청
  const addMutation = useAddShippingRequest<string>(
    (res) => navigate(`/shipping/detail/${res.data.requestId}`),
    (err) => {
      err.response?.data.errors.forEach(e => {
        if (e.param.substring(0, 8) === "address.") {
          addressDispatcher({
            type: "SET_MESSAGE",
            target: e.param.substring(8) as keyof AddressFormType,
            value: e.message
          });
        } else {
          dispatch({ type: "SET_MESSAGE", target: e.param as keyof FormType, value: e.message });
        }
      });
    }
  )

  // 등록 이벤트
  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    addMutation.mutate({
      body: {
        voucherIds: state.data.voucherIds,
        address: addressState.form
      }
    });
  }, [addMutation, state, addressState]);

  return (
    <div className="ShippingWriterPage">
      <h1 className="title-label">소유권 배송 요청</h1>
      <form onSubmit={onSubmit}>
        <VoucherSection state={state} dispatch={dispatch} />
        <AddressSection state={addressState} dispatch={addressDispatcher} />
        <ButtonSection />
      </form>
    </div>
  );
}

export default Index;