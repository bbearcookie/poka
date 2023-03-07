import React from 'react';
import {
  LabelProps as LabelStylesProps,
  VoucherStateLabel,
  TradeStateLabel,
  ShippingStateLabel,
  PaymentStateLabel
} from './_styles';
import {
  VoucherStateKey, VoucherStateText,
  TradeStateKey, TradeStateText,
  ShippingStateKey, ShippingStateText,
  PaymentStateKey, PaymentStateText
} from './_types';

interface Props {
  className?: string;
  state: {
    type: 'voucher';
    key: VoucherStateKey;
  } | {
    type: 'trade';
    key: TradeStateKey;
  } | {
    type: 'shipping';
    key: ShippingStateKey;
  } | {
    type: 'payment';
    key: PaymentStateKey;
  };
  styles?: LabelStylesProps;
}

function StateLabel({ className, state, styles }: Props) {
  switch (state.type) {
    case 'voucher':
      return (
        <VoucherStateLabel
          {...styles}
          className={className}
          type={state.key}
        >
          {VoucherStateText[state.key]}
        </VoucherStateLabel>)

    case 'trade':
      return (
        <TradeStateLabel
          {...styles}
          className={className}
          type={state.key}
        >
          {TradeStateText[state.key]}
        </TradeStateLabel>)

    case 'shipping':
      return (
        <ShippingStateLabel
        {...styles}
        className={className}
        type={state.key}
      >
        {ShippingStateText[state.key]}
      </ShippingStateLabel>)

    case 'payment':
      return (
        <PaymentStateLabel
          {...styles}
          className={className}
          type={state.key}
        >
          {PaymentStateText[state.key]}
        </PaymentStateLabel>)

    default:
      return <></>;
  }
}

export default StateLabel;