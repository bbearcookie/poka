import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import Input from '@component/form/input/Input';
import { InputMessage } from '@component/form/_styles';
import { State, Action } from '../reducer';
import { InputLine } from './_styles';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  changeInput: React.ChangeEventHandler<HTMLInputElement>;
  blurInput: React.FocusEventHandler<HTMLInputElement>;
}

function Contact({ state, dispatch, changeInput, blurInput }: Props) {
  // 연락처 상태 값 변경
  const changeContact = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // 숫자가 아닌 값 필터링 후 전화번호 형태로 하이픈 추가
      const value = e.target.value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

      dispatch({ type: 'SET_FORM_DATA', target: 'contact', value });
    },
    [dispatch]
  );

  return (
    <InputLine>
      <div className="label-section">
        <FontAwesomeIcon
          className="icon"
          icon={faPhone}
          width="1.5em"
          height="1.5em"
          color="#459A10"
        />
        <span className="label">연락처</span>
      </div>

      <div className="input-section">
        <Input
          type="tel"
          name="contact"
          placeholder="하이픈(-) 없이 숫자만 입력해주세요"
          maxLength={13}
          value={state.form.contact}
          onChange={changeContact}
          onBlur={blurInput}
          css={{
            width: '100%',
            height: '2.5em',
          }}
        />
        {state.message.contact && (
          <InputMessage css={{ margin: '0.5em 0 0 0' }}>{state.message.contact}</InputMessage>
        )}
      </div>
    </InputLine>
  );
}

export default Contact;
