import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';
import { State, Action } from '../reducer';
import { InputLine } from './_styles';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  changeInput: React.ChangeEventHandler<HTMLInputElement>;
  blurInput: React.FocusEventHandler<HTMLInputElement>;
}

function Recipient({ state, dispatch, changeInput, blurInput }: Props) {
  return (
    <InputLine>
      <div className="label-section">
        <FontAwesomeIcon
          className="icon"
          icon={faUser}
          width="1.5em"
          height="1.5em"
          color="#EC1B5A"
        />
        <span className="label">수령인</span>
      </div>

      <div className="input-section">
        <Input
          type="text"
          name="recipient"
          placeholder="수령인 성함을 입력해주세요"
          maxLength={20}
          value={state.form.recipient}
          onChange={changeInput}
          onBlur={blurInput}
          styles={{
            width: '100%',
            height: '2.5em',
          }}
        >
          {state.message.recipient && (
            <InputMessage styles={{ margin: '0.5em 0 0 0' }}>
              {state.message.recipient}
            </InputMessage>
          )}
        </Input>
      </div>
    </InputLine>
  );
}

export default Recipient;
