import React from 'react';
import { useAppSelector } from '@app/redux/reduxHooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';

interface RecipientSectionProps {
  changeInput: React.ChangeEventHandler<HTMLInputElement>;
  blurInput: React.FocusEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
}
const RecipientSectionDefaultProps = {};

function RecipientSection({ changeInput, blurInput, children }: RecipientSectionProps & typeof RecipientSectionDefaultProps) {
  const { form, inputMessage } = useAppSelector(state => state.addressEditor);
  
  return (
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
  );
}

RecipientSection.defaultProps = RecipientSectionDefaultProps;
export default RecipientSection;