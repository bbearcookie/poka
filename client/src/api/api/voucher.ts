import { client } from '@util/request';
import { ParamType as VouchersParam } from '@api/query/voucher/useVouchersQuery';

export const fetchVouchers = async (param: VouchersParam) => {
  const url = `/api/voucher`;
  const res = await client.get(url, { params: param });
  return res.data;
}