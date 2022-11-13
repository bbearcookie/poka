import React, { useState, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@app/redux/reduxHooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faInfoCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import CardBody from '@component/card/basic/CardBody';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';
import Select from '@component/form/Select';
import Button from '@component/form/Button';
import Address from './Address';
import { setInput, FormType } from './addressEditorSlice';

interface EditorProps {
  closeEditor: () => void;
  children?: React.ReactNode;
}
const EditorDefaultProps = {};

function Editor({ closeEditor, children }: EditorProps & typeof EditorDefaultProps) {
  const { form, inputMessage } = useAppSelector(state => state.addressEditor);
  const [showRequirement, setShowRequirement] = useState(false);
  const dispatch = useAppDispatch();

  // input 상태 값 변경
  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInput({
      name: e.target.name as keyof FormType,
      value: e.target.value
    }))
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
    console.log(form);
  }, [form]);

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
            value={form.name}
            onChange={changeInput}
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
              value={form.recipient}
              onChange={changeInput}
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
              placeholder="- 없이 숫자만 입력해주세요"
              value={form.contact}
              onChange={changeInput}
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
              <option value={0}>배송시 요청사항을 선택해주세요.</option>
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
              value={form.requirement}
              onChange={changeInput}
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