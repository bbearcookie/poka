import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ResponseError } from '@type/response';
import * as queryKey from '@api/queryKey';
import { TradeItem } from '@type/trade';
import { fetchTradeDetail } from '@api/api/trade';

export interface ResType extends TradeItem {
  message: string;
}

export default function useTradeQuery(
  tradeId: number,
  options?: UseQueryOptions<ResType, AxiosError<ResponseError>>
): UseQueryResult<ResType, AxiosError<ResponseError>> {
  return useQuery({
    queryKey: queryKey.tradeKeys.detail(tradeId),
    queryFn: () => fetchTradeDetail(tradeId),
    enabled: tradeId !== 0,
    ...options
  });
}