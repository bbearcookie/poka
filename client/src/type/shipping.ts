import { User } from '@type/user';

type PaymentState = 'waiting' | 'paid' | 'forgeried';
type RequestState = 'waiting' | 'shipped';

// 배송 주소 타입
export interface Address {
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

// 결제 타입
export interface Payment {
  paymentId: number;
  merchantUID: string;
  impUID: string;
  amount: number;
  state: PaymentState;
}

// 배송 요청 타입
export interface ShippingRequest {
  requestId: number;
  state: RequestState;
  writtenTime: string;
}

// 배송 요청 상세 타입
export interface ShippingRequestDetail extends ShippingRequest {
  address: Pick<Address, 'recipient' | 'contact' | 'postcode' | 'address' | 'addressDetail' | 'requirement'>;
  payment: Payment;
  author: User;
}

// 배송 요청 목록 아이템 타입
export interface ShippingRequestItem extends ShippingRequest {
  address: Pick<Address, 'recipient' | 'contact' | 'postcode' | 'address' | 'addressDetail' | 'requirement'>;
  payment: Pick<Payment, 'state'>;
  author: User;
  voucher: {
    amount: number;
    represent: {
      imageName: string;
      name: string;
    }
  }
}