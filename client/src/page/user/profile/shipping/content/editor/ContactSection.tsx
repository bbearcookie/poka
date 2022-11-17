import React, { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@app/redux/reduxHooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';
import { setInput } from './addressEditorSlice';

interface ContactSectionProps {
  changeInput: React.ChangeEventHandler<HTMLInputElement>;
  blurInput: React.FocusEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
}
const ContactSectionDefaultProps = {};

function ContactSection({ changeInput, blurInput, children }: ContactSectionProps & typeof ContactSectionDefaultProps) {
  const { form, inputMessage } = useAppSelector(state => state.addressEditor);
  const dispatch = useAppDispatch();

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

  return (
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
  );
}

ContactSection.defaultProps = ContactSectionDefaultProps;
export default ContactSection;