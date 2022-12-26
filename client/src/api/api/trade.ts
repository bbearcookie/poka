import { client } from '@util/request';
import { ParamType as AddTradeParam } from '@api/mutation/trade/useAddTrade';

export const addTrade = async (param: AddTradeParam) => {
  const url = `/api/trade`;
  const res = await client.post(url, param.body);
  return res;
}