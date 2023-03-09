import React, { useCallback } from 'react';
import { State, Action } from '@component/search/content/filter/reducer';
import { RadioTargetType } from '@component/search/content/filter/reducer';
import {
  VoucherStateText,
  ShippingStateText,
  PaymentStateText
} from '@component/label/stateLabel/_types';
import Keyword from './content/_Keyword';

interface Props {
  target: RadioTargetType;
  state: State;
  dispatch: React.Dispatch<Action>;
}

function RadioKeywords({ target, state, dispatch }: Props) {

  // 설정된 필터 기본 값으로 설정
  const handleCancel = useCallback((target: RadioTargetType) => {
    dispatch({ type: 'SET_RADIO_FILTER', value: { target, value: 'all' }});
  }, [dispatch]);

  switch (target) {
    case "voucher":
      if (state.voucherState !== "all") {
        return (
          <Wrapper
            title="소유권 상태"
            target="voucher"
            text={VoucherStateText[state.voucherState]}
            handleCancel={handleCancel}
          />
        );
      }
      break;
    case "shipping":
      if (state.shippingState !== "all") {
        return (
          <Wrapper
            title="배송 상태"
            target="shipping"
            text={ShippingStateText[state.shippingState]}
            handleCancel={handleCancel}
          />
        );
      }
      break;
    case "payment":
      if (state.paymentState !== "all") {
        return (
          <Wrapper
            title="결제 상태"
            target="payment"
            text={PaymentStateText[state.paymentState]}
            handleCancel={handleCancel}
          />
        );
      }
      break;
    default:
      break;
  }

  return <></>;
}

export default RadioKeywords;

interface WrapperProps {
  target: RadioTargetType;
  title: string;
  text: string;
  handleCancel: (target: RadioTargetType) => void;
}

function Wrapper({ target, title, text, handleCancel }: WrapperProps) {
  return (
    <Keyword category={title} text={text} handleClick={() => handleCancel(target)} />
  )
}