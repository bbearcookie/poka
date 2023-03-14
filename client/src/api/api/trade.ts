import { client } from '@util/request';

// 교환글 목록 조회
export const fetchTrades = async (params: object) => {
  const url = `/api/trade`;
  const res = await client.get(url, { params });
  return res.data;
}

// 교환글 상세 조회
export const fetchTradeDetail = async (tradeId: number) => {
  const url = `/api/trade/${tradeId}`;
  const res = await client.get(url);
  return res.data;
}

// 로그인 한 사용자가 가지고 있는 소유권 중에서 해당 교환글과 교환이 가능한 소유권 조회
export const fetchTradeExchange = async (tradeId: number) => {
  const url = `/api/trade/${tradeId}/exchange`;
  const res = await client.get(url);
  return res.data;
}

// 교환 내역 조회
export const fetchUserTradeHistory = async (userId: number, params: object) => {
  const url = `/api/user/${userId}/trade-history`;
  const res = await client.get(url, { params });
  return res.data;
}

// 교환글 추가
export const addTrade = async (body: object) => {
  const url = `/api/trade`;
  const res = await client.post(url, body);
  return res;
}

// 교환글 수정
export const modifyTrade = async (tradeId: number, body: object) => {
  const url = `/api/trade/${tradeId}`;
  const res = await client.put(url, body);
  return res;
}

// 교환글 삭제
export const deleteTrade = async (tradeId: number) => {
  const url = `/api/trade/${tradeId}`;
  const res = await client.delete(url);
  return res;
}

// 교환
export const exchangeTrade = async (tradeId: number, body: object) => {
  const url = `/api/trade/${tradeId}/exchange`;
  const res = await client.post(url, body);
  return res;
}