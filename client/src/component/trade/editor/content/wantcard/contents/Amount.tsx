import React, { useCallback } from 'react';
import Input from '@component/form/input/Input';
import { InputMessage } from '@component/form/_styles';
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
        css={{
          display: 'block',
          maxWidth: '14em',
          height: '2em',
          margin: '0.75em 0',
        }}
      />
      {state.message.amount && (
        <InputMessage css={{ margin: '0 0 0.5em 0' }}>{state.message.amount}</InputMessage>
      )}
    </div>
  );
}

export default Amount;
