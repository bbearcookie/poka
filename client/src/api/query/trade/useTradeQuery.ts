import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ResponseError } from '@type/response';
import * as queryKey from '@api/queryKey';
import { TradeType, WantcardType } from '@type/trade';
import { fetchTradeDetail } from '@api/api/trade';

export interface ResType extends TradeType {
  message: string;
  wantcards: WantcardType[];
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