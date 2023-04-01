export type VoucherStateKey = 'all' | 'available' | 'trading' | 'shipping' | 'shipped';
export const VoucherStateText: {
  [k in VoucherStateKey]: string;
} = {
  all: '전체',
  available: '교환가능',
  trading: '교환중',
  shipping: '배송대기',
  shipped: '배송완료',
};

export type VoucherLogStateKey = 'issued' | 'traded' | 'shipped';
export const VoucherLogStateText: {
  [k in VoucherLogStateKey]: string;
} = {
  issued: '발급',
  traded: '교환',
  shipped: '배송'
};

export type TradeStateKey = 'all' | 'trading' | 'traded';
export const TradeStateText: {
  [k in TradeStateKey]: string;
} = {
  all: '전체',
  trading: '대기중',
  traded: '완료',
};

export type ShippingStateKey = 'all' | 'waiting' | 'shipped';
export const ShippingStateText: {
  [k in ShippingStateKey]: string;
} = {
  all: '전체',
  waiting: '대기중',
  shipped: '완료',
};

export type PaymentStateKey = 'all' | 'waiting' | 'paid' | 'forgeried';
export const PaymentStateText: {
  [k in PaymentStateKey]: string;
} = {
  all: '전체',
  waiting: '미결제',
  paid: '완료',
  forgeried: '위조',
};
