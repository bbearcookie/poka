import React, { useState, useCallback } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '@app/redux/reduxHooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faInfoCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import * as userAPI from '@api/userAPI';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType, getErrorMessage } from '@util/commonAPI';
import CardBody from '@component/card/basic/CardBody';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';
import Select from '@component/form/Select';
import Button from '@component/form/Button';
import Address from './Address';
import { initialize, setInput, setInputMessage, FormType } from './addressEditorSlice';

interface EditorProps {
  closeEditor: () => void;
  children?: React.ReactNode;
}
const EditorDefaultProps = {};

function Editor({ closeEditor, children }: EditorProps & typeof EditorDefaultProps) {
  const { form, inputMessage } = useAppSelector(state => state.addressEditor);
  const [showRequirement, setShowRequirement] = useState(false);
  const userId = useAppSelector(state => state.auth.user_id);
  const dispatch = useAppDispatch();

  // 데이터 추가 요청
  const postMutation = useMutation(userAPI.postShippingAddress.axios, {
    onSuccess: (res) => {
      toast.success(res.data?.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      dispatch(initialize());
      closeEditor();
    },
    onError: (err: AxiosError<ErrorType<keyof FormType>>) => {
      toast.error(getErrorMessage(err), { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });

      err.response?.data.errors.forEach((e) => {
        dispatch(setInputMessage({ name: e.param, value: e.message }));
      });
    }
  })

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

  // 연락처 상태 값 변경
  const changeContact = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자가 아닌 값 필터링 후 전화번호 형태로 하이픈 추가
    const value = e.target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

    dispatch(setInput({
      name: 'contact',
      value
    }));
  }, [dispatch]);

  // 배송 요청사항 선택 변경
  const changeRequirement = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setInput({
      name: e.target.name as keyof FormType,
      value: e.target.value
    }));

    // 직접 입력하는 input 요소 보여주기
    if (e.target.value === '') setShowRequirement(true);
    else setShowRequirement(false);
  }, [dispatch]);

  // 폼 전송 이벤트
  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    postMutation.mutate({
      userId,
      data: {
        name: form.name,
        recipient: form.recipient,
        contact: form.contact,
        postcode: form.postcode,
        address: form.address,
        address_detail: form.address_detail,
        requirement: form.requirement === 'DEFAULT_VALUE' ? '' : form.requirement
      }
    });
  }, [form, userId, postMutation]);

  return (
    <CardBody className="editor-section">
      <form onSubmit={onSubmit}>

        <section className="input-line">
          <section className="label-section">
            <FontAwesomeIcon className="icon" icon={faLocationDot} width="1.5em" height="1.5em" color="#2678F3" />
            <span className="label">배송지 이름</span>
          </section>
          <Input
            type="text"
            name="name"
            placeholder="배송지 이름을 입력해주세요"
            maxLength={20}
            value={form.name}
            onChange={changeInput}
            onBlur={blurInput}
            styles={{
              width: "100%",
              height: "2.5em"
            }}
          >
            {inputMessage.name && <InputMessage styles={{ margin: "0.5em 0 0 0" }}>{inputMessage.name}</InputMessage>}
          </Input>
        </section>

        <section className="input-line">
          <section className="label-section">
            <FontAwesomeIcon className="icon" icon={faUser} width="1.5em" height="1.5em" color="#EC1B5A" />
            <span className="label">수령인</span>
          </section>
          <section className="input-section">
            <Input
              type="text"
              name="recipient"
              placeholder="수령인 성함을 입력해주세요"
              maxLength={20}
              value={form.recipient}
              onChange={changeInput}
              onBlur={blurInput}
              styles={{
                width: "100%",
                height: "2.5em"
              }}
            >
              {inputMessage.recipient && <InputMessage styles={{ margin: "0.5em 0 0 0" }}>{inputMessage.recipient}</InputMessage>}
            </Input>
          </section>
        </section>

        <section className="input-line">
          <section className="label-section">
            <FontAwesomeIcon className="icon" icon={faPhone} width="1.5em" height="1.5em" color="#459A10" />
            <span className="label">연락처</span>
          </section>
          <section className="input-section">
            <Input
              type="tel"
              name="contact"
              placeholder="하이픈(-) 없이 숫자만 입력해주세요"
              maxLength={13}
              value={form.contact}
              onChange={changeContact}
              onBlur={blurInput}
              styles={{
                width: "100%",
                height: "2.5em"
              }}
            >
              {inputMessage.contact && <InputMessage styles={{ margin: "0.5em 0 0 0" }}>{inputMessage.contact}</InputMessage>}
            </Input>
          </section>
        </section>

        <Address />

        <section className="input-line">
          <section className="label-section">
            <FontAwesomeIcon className="icon" icon={faInfoCircle} width="1.5em" height="1.5em" color="#F3E079" />
            <span className="label">배송 요청사항</span>
          </section>
          <section className="input-section">
            <Select
              name="requirement"
              onChange={changeRequirement}
              styles={{
                width: "100%",
                height: "2.5em"
              }}
            >
              <option value="DEFAULT_VALUE">배송시 요청사항을 선택해주세요.</option>
              <option>직접 수령하겠습니다.</option>
              <option>배송 전 연락 바랍니다.</option>
              <option>부재 시 경비실에 맡겨주세요.</option>
              <option>부재 시 문 앞에 놓아주세요.</option>
              <option>부재 시 택배함에 놓아주세요.</option>
              <option value="">직접 입력</option>
            </Select>

            {showRequirement && 
            <Input
              type="text"
              name="requirement"
              placeholder="직접 입력"
              maxLength={50}
              value={form.requirement}
              onChange={changeInput}
              onBlur={blurInput}
              styles={{
                width: "100%",
                height: "2.5em",
                marginTop: "0.5em"
              }}
            >
              {inputMessage.requirement && <InputMessage styles={{ margin: "0.5em 0 0 0" }}>{inputMessage.requirement}</InputMessage>}
            </Input>}
          </section>
        </section>

        <section className="button-section">
          <Button 
            type="submit"
            styles={{
              theme: "primary",
              padding: "0.7em 1em",
              marginLeft: "0.5em"
            }}
          >추가</Button>
          <Button
            onClick={closeEditor}
            styles={{
              theme: "gray-outlined",
              padding: "0.7em 1em",
              marginLeft: "0.5em"
            }}
          >취소</Button>
        </section>

      </form>
    </CardBody>
  );
}

Editor.defaultProps = EditorDefaultProps;
export default Editor;