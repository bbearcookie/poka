export type VoucherStateKey = 'all' | 'available' | 'trading' | 'shipping' | 'shipped';
export const VoucherStateText: {
  [k in VoucherStateKey]: string;
} = {
  all: '전체',
  available: '교환가능',
  trading: '교환중',
  shipping: '배송대기',
  shipped: '배송완료',
}

export type TradeStateKey = 'trading' | 'traded';
export const TradeStateText: {
  [k in TradeStateKey]: string;
} = {
  trading: '대기중',
  traded: '완료'
}

export type ShippingStateKey = 'waiting' | 'shipped';
export const ShippingStateText: {
  [k in ShippingStateKey]: string;
} = {
  waiting: '대기중',
  shipped: '완료'
}

export type PaymentStateKey = 'waiting' | 'paid' | 'forgeried';
export const PaymentStateText: {
  [k in PaymentStateKey]: string;
} = {
  waiting: '미결제',
  paid: '완료',
  forgeried: '위조',
}