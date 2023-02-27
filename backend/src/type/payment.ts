export type PaymentStateType = 'waiting' | 'paid' | 'forgeried';

export interface PaymentType {
  paymentId: number;
  merchantUID: string;
  impUID: string;
  amount: number;
  state: PaymentStateType;
}