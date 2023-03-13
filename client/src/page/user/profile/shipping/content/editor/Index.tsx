import React, { useCallback, useReducer } from 'react';
import produce from 'immer';
import { useAppSelector } from '@app/redux/reduxHooks';
import useModifyShippingAddress from '@api/mutation/shipping/useModifyShippingAddress';
import useAddShippingAddress, { ResType } from '@api/mutation/shipping/useAddShippingAddress';
import { AxiosResponse, AxiosError } from 'axios';
import { ResponseError } from '@type/response';
import Button from '@component/form/Button';
import reducer, { initialState, FormType } from '@component/shipping/address/editor/reducer';
import AddressEditor from '@component/shipping/address/editor/AddressEditor';
import { ShippingAddressType } from '@type/shipping';

interface Props {
  address?: ShippingAddressType;
  closeEditor: () => void;
}

function Index({ address, closeEditor }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState, produce(draft => {
    if (!address) return;
    draft.form = address;
  }));
  const { userId } = useAppSelector(state => state.auth);

  // API 요청 성공시
  const onSuccess = useCallback((res: AxiosResponse<ResType, any>) => {
    dispatch({ type: 'SET_FORM', form: initialState.form });
    closeEditor();
  }, [closeEditor]);

  // API 요청 실패시
  const onError = useCallback((err: AxiosError<ResponseError<string>, any>) => {
    err.response?.data.errors.forEach((e) => {
      if (e.param.substring(0, 8) === "address.") {
        dispatch({
          type: 'SET_MESSAGE',
          target: e.param.substring(8) as keyof FormType,
          value: e.message
        });
      }
    });
  }, []);

  // 데이터 추가 요청
  const postMutation = useAddShippingAddress(onSuccess, onError);

  // 데이터 수정 요청
  const putMutation = useModifyShippingAddress(userId, onSuccess, onError);

  // 폼 전송 이벤트
  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: state.form.name,
      recipient: state.form.recipient,
      contact: state.form.contact,
      postcode: state.form.postcode,
      address: state.form.address,
      addressDetail: state.form.addressDetail,
      requirement: state.form.requirement
    }
    
    // 수정 모드일경우
    if (address) putMutation.mutate({ addressId: address.addressId, body: { address: data } });
    // 작성 모드일경우
    else postMutation.mutate({ userId, body: { address: data } });

  }, [address, state, userId, postMutation, putMutation]);

  return (
    <AddressEditor state={state} dispatch={dispatch}>
      <section className="button-section">
        <Button 
          type="button"
          onClick={onSubmit}
          styles={{
            theme: "primary",
            padding: "0.7em 1em",
            marginLeft: "0.5em"
          }}
        >{address ? "수정" : "등록"}</Button>
        <Button
          onClick={closeEditor}
          styles={{
            theme: "gray-outlined",
            padding: "0.7em 1em",
            marginLeft: "0.5em"
          }}
        >취소</Button>
      </section>
    </AddressEditor>
  );
}

export default Index;