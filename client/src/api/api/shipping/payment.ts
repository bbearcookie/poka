import { client } from '@util/request';

// 결제 확인
export const checkShippingPayment = async (requestId: number, body?: object) => {
  const url = `/api/shipping/request/${requestId}/payment`;
  const res = await client.post(url, body);
  return res;
}

// 배송비 환불
export const refundShippingPayment = async (requestId: number) => {
  const url = `/api/shipping/request/${requestId}/refund`;
  const res = await client.post(url);
  return res;
}