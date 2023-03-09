type PaymentStateType = 'waiting' | 'paid' | 'forgeried';
type RequestStateType = 'waiting' | 'shipped';

export interface ShippingAddressType {
  addressId: number;
  userId: number;
  name: string;
  recipient: string;
  contact: string;
  postcode: string;
  address: string;
  addressDetail: string;
  requirement: string;
  prime: number;
}

export interface ShippingRequestType {
  requestId: number;
  requestState: RequestStateType;
  recipient: string;
  contact: string;
  postcode: string;
  address: string;
  addressDetail: string;
  requirement: string;
  writtenTime: string;
  userId: number;
  username: string;
  nickname: string;
  userImageName: string;
  paymentId: number;
  merchantUID: string;
  amount: number;
  paymentState: PaymentStateType;
}

export interface ShippingListItemType {
  requestId: number;
  requestState: RequestStateType;
  paymentState: PaymentStateType;
  userId: number;
  username: string;
  nickname: string;
  userImageName: string;
  voucherAmount: number;
  writtenTime: string;
}