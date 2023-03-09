import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ResponseError } from '@type/response';
import * as queryKey from '@api/queryKey';
import { VoucherType } from '@type/voucher';
import { fetchTradeExchange } from '@api/api/trade';

export interface ResType {
  message: string;
  vouchers: VoucherType[];
}

export default function useTradeExchangeQuery(
  tradeId: number,
  options?: UseQueryOptions<ResType, AxiosError<ResponseError>>
): UseQueryResult<ResType, AxiosError<ResponseError>> {
  return useQuery({
    queryKey: queryKey.tradeKeys.exchange(tradeId),
    queryFn: () => fetchTradeExchange(tradeId),
    enabled: tradeId !== 0,
    ...options
  });
}