import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
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

function Name({ state, dispatch, changeInput, blurInput }: Props) {
  return (
    <InputLine>
      <div className="label-section">
        <FontAwesomeIcon
          className="icon"
          icon={faLocationDot}
          width="1.5em"
          height="1.5em"
          color="#2678F3"
        />
        <span className="label">배송지 이름</span>
      </div>

      <div className="input-section">
        <Input
          type="text"
          name="name"
          placeholder="배송지 이름을 입력해주세요"
          maxLength={20}
          value={state.form.name}
          onChange={changeInput}
          onBlur={blurInput}
          styles={{
            width: '100%',
            height: '2.5em',
          }}
        />
        {state.message.name && (
          <InputMessage styles={{ margin: '0.5em 0 0 0' }}>{state.message.name}</InputMessage>
        )}
      </div>
    </InputLine>
  );
}

export default Name;
