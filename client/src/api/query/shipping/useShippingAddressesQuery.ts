import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ResponseError } from '@type/response';
import { ShippingAddressType } from '@type/shipping';
import { fetchUserShippingAddresses } from '@api/api/shipping/address';
import * as queryKey from '@api/queryKey';

export interface ResType {
  message: string;
  addresses: ShippingAddressType[];
}

export default function useShippingAddressesQuery(
  userId: number,
  options?: UseQueryOptions<ResType, AxiosError<ResponseError>>
): UseQueryResult<ResType, AxiosError<ResponseError>> {
  return useQuery({
    queryKey: queryKey.addressKeys.all,
    queryFn: () => fetchUserShippingAddresses(userId),
    enabled: userId !== 0,
    ...options
  });
}