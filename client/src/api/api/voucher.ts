import { client } from '@util/request';
import { ParamType as VouchersParam } from '@api/query/voucher/useNewVouchersQuery';
import { ParamType as VoucherLogsParam } from '@api/query/voucher/useVoucherLogsQuery';
import { ParamType as AddVouchersParam } from '@api/mutation/voucher/useAddVouchers';
import { ParamType as DeleteVoucherParam } from '@api/mutation/voucher/useDeleteVoucher';

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

export const fetchVoucherTradeDetail = async (voucherId: number) => {
  const url = `/api/voucher/${voucherId}/trade`;
  const res = await client.get(url);
  return res.data;
}

export const addVouchers = async (param: AddVouchersParam) => {
  const url = `/api/voucher`;
  const res = await client.post(url, param.body);
  return res;
}

export const deleteVoucher = async (param: DeleteVoucherParam) => {
  const url = `/api/voucher/${param.voucherId}`;
  const res = await client.delete(url);
  return res;
}