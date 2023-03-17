import React, { useCallback } from 'react';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';
import { State as FormState, Action as FormAction } from '../../reducer';

interface Props {
  form: FormState;
  formDispatch: React.Dispatch<FormAction>;
}

function PhotocardAmount({ form, formDispatch }: Props) {

  // input 변경시 값 변경
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (e.target.value === '') value = 0;
    else if (!value) return;
    formDispatch({ type: 'SET_AMOUNT', payload: value });
    formDispatch({ type: 'SET_MESSAGE', target: 'amount', value: '' });
  }, [formDispatch]);

  return (
    <div>
      <b className="label">수량</b>
      <Input
        type="text"
        value={form.data.amount}
        name="amount"
        onChange={onChange}
        styles={{
          width: "14em",
          height: "2em",
          margin: "0.75em 0"
        }}
      />
      {form.message.amount && <InputMessage styles={{ margin: "0 0 0.5em 0" }}>{form.message.amount}</InputMessage>}
    </div>
  );
}

export default PhotocardAmount;