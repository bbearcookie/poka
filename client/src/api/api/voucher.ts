import { client } from '@util/request';

// 소유권 목록 조회
export const fetchVouchers = async (params: object) => {
  const url = `/api/voucher`;
  const res = await client.get(url, { params });
  return res.data;
}

// 소유권 상세 조회
export const fetchVoucherDetail = async (voucherId: number) => {
  const url = `/api/voucher/${voucherId}`;
  const res = await client.get(url);
  return res.data;
}

// 소유권 기록 조회
export const fetchVoucherLogsDetail = async (voucherId: number, params: object) => {
  const url = `/api/voucher/${voucherId}/log`;
  const res = await client.get(url, { params });
  return res.data;
}

// 특정 소유권으로 등록된 교환글 중 아직 성사되지 않은 글 조회
export const fetchVoucherTradeDetail = async (voucherId: number) => {
  const url = `/api/voucher/${voucherId}/trade`;
  const res = await client.get(url);
  return res.data;
}

// 소유권 추가
export const addVouchers = async (body: object) => {
  const url = `/api/voucher`;
  const res = await client.post(url, body);
  return res;
}

// 소유권 삭제
export const deleteVoucher = async (voucherId: number) => {
  const url = `/api/voucher/${voucherId}`;
  const res = await client.delete(url);
  return res;
}