import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ResponseError } from '@type/response';
import { TradeDetail } from '@type/trade';
import * as queryKey from '@api/queryKey';
import { fetchVoucherTradeDetail } from '@api/api/voucher';

export interface ResType extends TradeDetail {
  message: string;
}

export default function useVoucherTradeQuery(
  voucherId: number,
  options?: UseQueryOptions<ResType, AxiosError<ResponseError>>
): UseQueryResult<ResType, AxiosError<ResponseError>> {
  return useQuery({
    queryKey: queryKey.voucherKeys.trade(voucherId),
    queryFn: () => fetchVoucherTradeDetail(voucherId),
    enabled: voucherId !== 0,
    ...options
  });
}