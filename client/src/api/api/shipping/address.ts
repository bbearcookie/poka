import { client } from '@util/request';

// 배송 정보 목록 조회
export const fetchUserShippingAddresses = async (userId: number) => {
  const url = `/api/user/${userId}/shipping-address`;
  const res = await client.get(url);
  return res.data;
}

// 배송 정보 추가
export const addShippingAddress = async (userId: number, body?: object) => {
  const url = `/api/user/${userId}/shipping-address`;
  const res = await client.post(url, body);
  return res;
}

// 배송 정보 수정
export const modifyShippingAddress = async (addressId: number, body?: object) => {
  const url = `/api/shipping/address/${addressId}`;
  const res = await client.put(url, body);
  return res;
}

// 배송 정보 삭제
export const deleteShippingAddress = async (addressId: number) => {
  const url = `/api/shipping/address/${addressId}`;
  const res = await client.delete(url);
  return res;
}

// 대표 배송지 변경
export const changePrimeAddress = async (addressId: number) => {
  const url = `/api/shipping/address/${addressId}/prime`;
  const res = await client.patch(url);
  return res;
}