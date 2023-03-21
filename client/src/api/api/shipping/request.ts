import { client } from '@util/request';

// 배송 요청 목록 조회
export const fetchShippings = async (params: object) => {
  const url = `/api/shipping/request`;
  const res = await client.get(url, { params });
  return res.data;
}

// 배송 요청 상세 조회
export const fetchShippingRequestDetail = async (requestId: number) => {
  const url = `/api/shipping/request/${requestId}`;
  const res = await client.get(url);
  return res.data;
}

// 배송 요청 등록
export const addShippingRequest = async (body?: object) => {
  const url = `/api/shipping/request`;
  const res = await client.post(url, body);
  return res;
}

// 배송 요청 삭제
export const deleteShippingRequest = async (requestId: number) => {
  const url = `/api/shipping/request/${requestId}`;
  const res = await client.delete(url);
  return res;
}

// 발송 처리
export const approveShippingRequest = async (requestId: number) => {
  const url = `/api/shipping/request/${requestId}/approve`;
  const res = await client.post(url);
  return res;
}