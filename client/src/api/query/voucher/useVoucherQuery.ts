import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
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
  options?: UseQueryOptions<ResType, AxiosError<ErrorType>>
): UseQueryResult<ResType, AxiosError<ErrorType>> {
  return useQuery({
    queryKey: queryKey.voucherKeys.detail(voucherId),
    queryFn: () => fetchVoucherDetail(voucherId),
    ...options
  });
}