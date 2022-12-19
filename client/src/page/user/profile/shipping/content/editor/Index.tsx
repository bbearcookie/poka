import React, { useReducer, useEffect, useCallback } from 'react';
import useModifyShippingAddress from '@api/mutation/address/useModifyShippingAddress';
import useAddShippingAddress, { ResType } from '@api/mutation/address/useAddShippingAddress';
import { AxiosResponse, AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import { useAppSelector } from '@app/redux/reduxHooks';
import { AddressType } from '@type/user';
import CardHeader from '@component/card/basic/CardHeader';
import NameSection from './content/NameSection';
import ContactSection from './content/ContactSection';
import AddressSection from './content/AddressSection';
import RequirementSection from './content/RequirementSection';
import RecipientSection from './content/RecipientSection';
import ButtonSection from './content/ButtonSection';
import reducer, { initialState, FormType } from './reducer';

interface Props {
  address?: AddressType;
  closeEditor: () => void;
}
const DefaultProps = {};

function Editor({ address, closeEditor }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const userId = useAppSelector(state => state.auth.user_id);

  // 수정 모드일 경우 기본 값을 상태에 저장함.
  useEffect(() => {
    if (!address) return;
    dispatch({ type: 'SET_FORM', form: address });
  }, []);

  // input 상태 값 변경
  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_FORM_DATA', target: e.target.name as keyof FormType, value: e.target.value  });
  }, [dispatch]);

  // input 포커스 해제시 유효성 검사
  const blurInput = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_MESSAGE', target: e.target.name as keyof FormType, value: '' });
  }, [dispatch]);

  // API 요청 성공시
  const onSuccess = useCallback((res: AxiosResponse<ResType, any>) => {
    dispatch({ type: 'SET_FORM', form: initialState.form });
    closeEditor();
  }, [closeEditor]);

  // API 요청 실패시
  const onError = useCallback((err: AxiosError<ErrorType<keyof FormType>, any>) => {
    err.response?.data.errors.forEach((e) => {
      dispatch({ type: 'SET_MESSAGE', target: e.param, value: e.message });
    });
  }, []);

  // 데이터 추가 요청
  const postMutation = useAddShippingAddress<keyof FormType>(onSuccess, onError);

  // 데이터 수정 요청
  const putMutation = useModifyShippingAddress<keyof FormType>(userId, onSuccess, onError);

  // 폼 전송 이벤트
  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: state.form.name,
      recipient: state.form.recipient,
      contact: state.form.contact,
      postcode: state.form.postcode,
      address: state.form.address,
      address_detail: state.form.address_detail,
      requirement: state.form.requirement === 'DEFAULT_VALUE' ? '' : state.form.requirement
    }
    
    // 수정 모드일경우
    if (address) putMutation.mutate({ addressId: address.address_id, body: data })
    // 작성 모드일경우
    else postMutation.mutate({ userId, body: data });

  }, [address, state, userId, postMutation, putMutation]);

  return (
    <CardHeader className="editor-section">
      <form onSubmit={onSubmit}>
        <NameSection state={state} dispatch={dispatch} changeInput={changeInput} blurInput={blurInput} />
        <RecipientSection state={state} dispatch={dispatch} changeInput={changeInput} blurInput={blurInput} />
        <ContactSection state={state} dispatch={dispatch} blurInput={blurInput} />
        <AddressSection state={state} dispatch={dispatch} changeInput={changeInput} blurInput={blurInput} />
        <RequirementSection state={state} dispatch={dispatch} defaultShow={address ? true : false} changeInput={changeInput} blurInput={blurInput} />
        <ButtonSection address={address} closeEditor={closeEditor} />
      </form>
    </CardHeader>
  );
}

export default Editor;