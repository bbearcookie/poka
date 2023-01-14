import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import * as queryKey from '@api/queryKey';
import { fetchTradeExchangeable } from '@api/api/trade';

export interface ResType {
  message: string;
  exchangeable: boolean;
}

export default function useTradeExchangeableQuery(
  tradeId: number,
  options?: UseQueryOptions<ResType, AxiosError<ErrorType>>
): UseQueryResult<ResType, AxiosError<ErrorType>> {
  return useQuery({
    queryKey: queryKey.tradeKeys.exchangeable(tradeId),
    queryFn: () => fetchTradeExchangeable(tradeId),
    enabled: tradeId !== 0,
    ...options
  });
}