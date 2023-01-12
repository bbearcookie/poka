import { client } from '@util/request';
import { ParamType as TradesParam } from '@api/query/trade/useTradesQuery';
import { ParamType as AddTradeParam } from '@api/mutation/trade/useAddTrade';
import { ParamType as DeleteTradeParam } from '@api/mutation/trade/useDeleteTrade';
import { ParamType as ModifyTradeParam } from '@api/mutation/trade/useModifyTrade';

export const fetchTrades = async (param: TradesParam) => {
  const url = `/api/trade`;
  const res = await client.get(url, { params: param });
  return res.data;
}

export const fetchTradeDetail = async (tradeId: number) => {
  const url = `/api/trade/${tradeId}`;
  const res = await client.get(url);
  return res.data;
}

export const addTrade = async (param: AddTradeParam) => {
  const url = `/api/trade`;
  const res = await client.post(url, param.body);
  return res;
}

export const deleteTrade = async (param: DeleteTradeParam) => {
  const url = `/api/trade/${param.tradeId}`;
  const res = await client.delete(url);
  return res;
}

export const modifyTrade = async (param: ModifyTradeParam) => {
  const url = `/api/trade/${param.tradeId}`;
  const res = await client.put(url, param.body);
  return res;
}