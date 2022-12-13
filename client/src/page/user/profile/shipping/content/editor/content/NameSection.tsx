import React from 'react';
import { useAppSelector } from '@app/redux/reduxHooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';

interface Props {
  changeInput: React.ChangeEventHandler<HTMLInputElement>;
  blurInput: React.FocusEventHandler<HTMLInputElement>;
}
const DefaultProps = {};

function NameSection({ changeInput, blurInput }: Props) {
  const { form, inputMessage } = useAppSelector(state => state.addressEditor);

  return (
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
  );
}

export default NameSection;