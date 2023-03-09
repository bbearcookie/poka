import React, { useCallback } from 'react';
import DropdownItem from '@component/dropdown/DropdownItem';
import {
  VoucherStateKey, VoucherStateText,
  ShippingStateKey, ShippingStateText,
  PaymentStateKey, PaymentStateText
} from '@component/label/stateLabel/_types';
import Filter from './content/_Filter';
import { State, Action, RadioTargetType } from './reducer';

interface Props {
  target: RadioTargetType;
  state: State;
  dispatch: React.Dispatch<Action>;
}

function RadioFilter({ target, state, dispatch }: Props) {

  // 아이템 클릭시 필터 변경
  const handleClickItem = useCallback((key: string) => {
    dispatch({
      type: "SET_RADIO_FILTER",
      value: {
        target: target,
        value: key as any
      }
    });
  }, [target, dispatch]);

  switch (target) {
    case "voucher":
      return (
        <Wrapper
          title="소유권 상태"
          state={state.voucherState}
          text={VoucherStateText}
          handleClickItem={handleClickItem}
        />
      );
    case "shipping":
      return (
        <Wrapper
          title="배송 상태"
          state={state.shippingState}
          text={ShippingStateText}
          handleClickItem={handleClickItem}
        />
      );
    case "payment":
      return (
        <Wrapper
          title="결제 상태"
          state={state.paymentState}
          text={PaymentStateText}
          handleClickItem={handleClickItem}
        />
      );
    default:
      return <></>
  }
}

export default RadioFilter;

interface WrapperProps {
  title: string;
  state: VoucherStateKey | ShippingStateKey | PaymentStateKey;
  text: typeof VoucherStateText | typeof ShippingStateText | typeof PaymentStateText;
  handleClickItem: (key: string) => void;
}

function Wrapper({ title, state, text, handleClickItem }: WrapperProps) {
  return (
    <Filter title={title}>
      {Object.entries(text).map(([key, value]) => 
      <DropdownItem
        key={key}
        className="item"
        onClick={() => handleClickItem(key)}
      >
        <input type="radio" checked={state === key} readOnly />
        <span>{value}</span>
      </DropdownItem>)}
    </Filter>
  )
}