import { PaymentStateType } from "@type/payment";

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
  requestState: 'waiting' | 'shipped';
  recipient: string;
  contact: string;
  postcode: string;
  address: string;
  addressDetail: string;
  requirement: string;
  writtenTime: Date;
  userId: number;
  username: string;
  nickname: string;
  userImageName: string;
  paymentId: number;
  merchantUID: string;
  amount: number;
  paymentState: PaymentStateType;
}