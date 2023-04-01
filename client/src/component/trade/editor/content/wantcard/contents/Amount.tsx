import React, { useCallback } from 'react';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';
import { State, Action } from '@component/trade/editor/reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function Amount({ state, dispatch }: Props) {
  // input 변경시 값 변경
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = Number(e.target.value);
      if (e.target.value === '') value = 0;
      else if (!value) return;
      dispatch({ type: 'SET_AMOUNT', payload: value });
      dispatch({ type: 'SET_MESSAGE', target: 'amount', value: '' });
    },
    [dispatch]
  );

  return (
    <div>
      <b className="label">수량</b>
      <Input
        type="text"
        value={state.data.amount}
        name="amount"
        onChange={onChange}
        styles={{
          width: '14em',
          height: '2em',
          margin: '0.75em 0',
        }}
      />
      {state.message.amount && (
        <InputMessage styles={{ margin: '0 0 0.5em 0' }}>{state.message.amount}</InputMessage>
      )}
    </div>
  );
}

export default Amount;
