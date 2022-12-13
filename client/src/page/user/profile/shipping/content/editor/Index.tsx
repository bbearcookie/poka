import React, { useEffect, useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '@app/redux/reduxHooks';
import * as userAPI from '@api/userAPI';
import * as shippingAddressAPI from '@api/shippingAddressAPI';
import * as queryKey from '@util/queryKey';
import { AddressType } from '@api/shippingAddressAPI';
import { AxiosError } from 'axios';
import { ErrorType, getErrorMessage } from '@util/request';
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
  const queryClient = useQueryClient();

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
  const postMutation = useMutation(userAPI.postShippingAddress.axios, {
    onSuccess: (res) => {
      toast.success(res.data?.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      dispatch(initialize());
      queryClient.invalidateQueries(queryKey.userKeys.address(userId));
      queryClient.invalidateQueries(queryKey.addressKeys.all);
      closeEditor();
    },
    onError: (err: AxiosError<ErrorType<keyof FormType>>) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });

      err.response?.data.errors.forEach((e) => {
        dispatch(setInputMessage({ name: e.param, value: e.message }));
      });
    }
  });

  // 데이터 수정 요청
  const putMutation = useMutation(shippingAddressAPI.putShippingAddress.axios, {
    onSuccess: (res) => {
      toast.success(res.data?.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      dispatch(initialize());
      queryClient.invalidateQueries(queryKey.userKeys.address(userId));
      queryClient.invalidateQueries(queryKey.addressKeys.all);
      closeEditor();
    },
    onError: (err: AxiosError<ErrorType<keyof FormType>>) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });

      err.response?.data.errors.forEach((e) => {
        dispatch(setInputMessage({ name: e.param, value: e.message }));
      });
    }
  })

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
    if (address) putMutation.mutate({ addressId: address.address_id || -1, data });
    // 작성 모드일경우
    else postMutation.mutate({ userId, data });

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