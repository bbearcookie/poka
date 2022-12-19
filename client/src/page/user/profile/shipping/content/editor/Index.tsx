import React, { useEffect, useCallback } from 'react';
import useModifyShippingAddress from '@api/mutation/address/useModifyShippingAddress';
import useAddShippingAddress from '@api/mutation/address/useAddShippingAddress';
import { useAppSelector, useAppDispatch } from '@app/redux/reduxHooks';
import { AddressType } from '@type/user';
import CardHeader from '@component/card/basic/CardHeader';
import NameSection from './content/NameSection';
import ContactSection from './content/ContactSection';
import AddressSection from './content/AddressSection';
import RequirementSection from './content/RequirementSection';
import RecipientSection from './content/RecipientSection';
import ButtonSection from './content/ButtonSection';
import { initialize, setDefaultState, setInput, setInputMessage, FormType } from './addressEditorSlice';

interface Props {
  address?: AddressType;
  closeEditor: () => void;
}
const DefaultProps = {};

function Editor({ address, closeEditor }: Props) {
  const { form } = useAppSelector(state => state.addressEditor);
  const userId = useAppSelector(state => state.auth.user_id);
  const dispatch = useAppDispatch();

  // 수정 모드일 경우 기본 값을 상태에 저장함.
  useEffect(() => {
    if (!address) return;
    dispatch(setDefaultState(address));
  }, []);

  // input 상태 값 변경
  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInput({
      name: e.target.name as keyof FormType,
      value: e.target.value
    }));
  }, [dispatch]);

  // input 포커스 해제시 유효성 검사
  const blurInput = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    dispatch(setInputMessage({
      name: e.target.name as keyof FormType,
      value: ''
    }));
  }, [dispatch]);

  // 데이터 추가 요청
  const postMutation = useAddShippingAddress<keyof FormType>(
    (res) => {
      dispatch(initialize());
      closeEditor();
    },
    (err) => {
      err.response?.data.errors.forEach((e) => {
        dispatch(setInputMessage({ name: e.param, value: e.message }));
      });
    }
  )

  // 데이터 수정 요청
  const putMutation = useModifyShippingAddress<keyof FormType>(userId,
    (res) => {
      dispatch(initialize());
      closeEditor();
    },
    (err) => {
      err.response?.data.errors.forEach((e) => {
        dispatch(setInputMessage({ name: e.param, value: e.message }));
      });
    }
  )

  // 폼 전송 이벤트
  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: form.name,
      recipient: form.recipient,
      contact: form.contact,
      postcode: form.postcode,
      address: form.address,
      address_detail: form.address_detail,
      requirement: form.requirement === 'DEFAULT_VALUE' ? '' : form.requirement
    }
    
    // 수정 모드일경우
    if (address) putMutation.mutate({ addressId: address.address_id, body: data })
    // 작성 모드일경우
    else postMutation.mutate({ userId, body: data });

  }, [address, form, userId, postMutation, putMutation]);

  return (
    <CardHeader className="editor-section">
      <form onSubmit={onSubmit}>
        <NameSection changeInput={changeInput} blurInput={blurInput} />
        <RecipientSection changeInput={changeInput} blurInput={blurInput} />
        <ContactSection blurInput={blurInput} />
        <AddressSection changeInput={changeInput} blurInput={blurInput} />
        <RequirementSection defaultShow={address ? true : false} changeInput={changeInput} blurInput={blurInput} />
        <ButtonSection address={address} closeEditor={closeEditor} />
      </form>
    </CardHeader>
  );
}

export default Editor;