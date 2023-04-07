import { CSSProp } from 'styled-components';
import {
  VoucherStateLabel,
  TradeStateLabel,
  ShippingStateLabel,
  PaymentStateLabel,
  VoucherLogStateLabel,
} from './_styles';
import {
  VoucherStateKey,
  VoucherStateText,
  VoucherLogStateKey,
  VoucherLogStateText,
  TradeStateKey,
  TradeStateText,
  ShippingStateKey,
  ShippingStateText,
  PaymentStateKey,
  PaymentStateText,
} from './_types';

interface Props {
  state:
    | {
        type: 'voucher';
        key: VoucherStateKey;
      }
    | {
        type: 'voucherLog';
        key: VoucherLogStateKey;
      }
    | {
        type: 'trade';
        key: TradeStateKey;
      }
    | {
        type: 'shipping';
        key: ShippingStateKey;
      }
    | {
        type: 'payment';
        key: PaymentStateKey;
      };
}

function StateLabel({ state, ...rest }: Props) {
  switch (state.type) {
    case 'voucher':
      return (
        <VoucherStateLabel {...rest} type={state.key}>
          {VoucherStateText[state.key]}
        </VoucherStateLabel>
      );
    case 'voucherLog':
      return (
        <VoucherLogStateLabel {...rest} type={state.key}>
          {VoucherLogStateText[state.key]}
        </VoucherLogStateLabel>
      );
    case 'trade':
      return (
        <TradeStateLabel {...rest} type={state.key}>
          {TradeStateText[state.key]}
        </TradeStateLabel>
      );
    case 'shipping':
      return (
        <ShippingStateLabel {...rest} type={state.key}>
          {ShippingStateText[state.key]}
        </ShippingStateLabel>
      );
    case 'payment':
      return (
        <PaymentStateLabel {...rest} type={state.key}>
          {PaymentStateText[state.key]}
        </PaymentStateLabel>
      );
    default:
      return <></>;
  }
}

export default StateLabel;
