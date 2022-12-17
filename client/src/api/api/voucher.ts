import { client } from '@util/request';
import { ParamType as VouchersParam } from '@api/query/voucher/useVouchersQuery';
import { ParamType as VoucherLogsParam } from '@api/query/voucher/useVoucherLogsQuery'

export const fetchVouchers = async (param: VouchersParam) => {
  const url = `/api/voucher`;
  const res = await client.get(url, { params: param });
  return res.data;
}

export const fetchVoucherDetail = async (voucherId: number) => {
  const url = `/api/voucher/${voucherId}`;
  const res = await client.get(url);
  return res.data;
}

export const fetchVoucherLogsDetail = async (voucherId: number, param: VoucherLogsParam) => {
  const url = `/api/voucher/${voucherId}/log`;
  const res = await client.get(url, { params: param });
  return res.data;
}