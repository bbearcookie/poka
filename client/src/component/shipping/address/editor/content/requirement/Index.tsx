import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Select from './Select';
import Input from './Input';
import { State, Action } from '../../reducer';
import { InputLine } from '../_styles';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  changeInput: React.ChangeEventHandler<HTMLInputElement>;
  blurInput: React.FocusEventHandler<HTMLInputElement>;
}

function Index({ state, dispatch, changeInput, blurInput }: Props) {
  const [showInput, setShowInput] = useState(state.form.requirement ? true : false);

  return (
    <InputLine>
      <div className="label-section">
        <FontAwesomeIcon
          className="icon"
          icon={faInfoCircle}
          width="1.5em"
          height="1.5em"
          color="#F3E079"
        />
        <span className="label">배송 요청사항</span>
      </div>

      <div className="input-section">
        <Select state={state} dispatch={dispatch} setShowInput={setShowInput} />
        {showInput && <Input state={state} dispatch={dispatch} changeInput={changeInput} blurInput={blurInput} />}
      </div>
    </InputLine>
  );
}

export default Index;
