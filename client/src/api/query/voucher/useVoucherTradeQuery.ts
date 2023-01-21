import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import { TradeType } from '@type/trade';
import * as queryKey from '@api/queryKey';
import { fetchVoucherTradeDetail } from '@api/api/voucher';

export interface ResType extends TradeType {
  message: string;
}

export default function useVoucherTradeQuery(
  voucherId: number,
  options?: UseQueryOptions<ResType, AxiosError<ErrorType>>
): UseQueryResult<ResType, AxiosError<ErrorType>> {
  return useQuery({
    queryKey: queryKey.voucherKeys.trade(voucherId),
    queryFn: () => fetchVoucherTradeDetail(voucherId),
    enabled: voucherId !== 0,
    ...options
  });
}