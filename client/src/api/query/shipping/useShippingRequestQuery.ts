import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import { fetchShippingRequestDetail } from '@api/api/shipping';
import * as queryKey from '@api/queryKey';
import { ShippingRequestType } from '@type/shipping';
import { VoucherType } from '@type/voucher';

export interface ResType {
  message: string;
  shipping: ShippingRequestType;
  vouchers: VoucherType[];
}

export default function useShippingRequestQuery(
  requestId: number,
  options?: UseQueryOptions<ResType, AxiosError<ErrorType>>
): UseQueryResult<ResType, AxiosError<ErrorType>> {
  return useQuery({
    queryKey: queryKey.shippingKeys.detail(requestId),
    queryFn: () => fetchShippingRequestDetail(requestId),
    enabled: requestId !== 0,
    ...options
  });
}