import { useQuery, QueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import { VoucherType } from '@type/voucher';
import { fetchVoucherDetail } from '@api/api/voucher';
import * as queryKey from '@api/queryKey';

export interface ResType extends VoucherType {
  message: string;
  user_id: number;
  user_image_name: string;
}

export default function useVoucherQuery(
  voucherId: number,
  options?: QueryOptions<ResType, AxiosError<ErrorType>>
): UseQueryResult<ResType, AxiosError<ErrorType>> {
  return useQuery(queryKey.voucherKeys.detail(voucherId), () => fetchVoucherDetail(voucherId), options);
}