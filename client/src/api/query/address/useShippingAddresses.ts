import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import { ShippingAddressType } from '@type/user';
import { fetchUserShippingAddress } from '@api/api/address';
import * as queryKey from '@api/queryKey';

export interface ResType {
  message: string;
  addresses: ShippingAddressType[];
}

export default function useShippingAddresses(
  userId: number,
  options?: UseQueryOptions<ResType, AxiosError<ErrorType>>
): UseQueryResult<ResType, AxiosError<ErrorType>> {
  return useQuery({
    queryKey: queryKey.userKeys.address(userId),
    queryFn: () => fetchUserShippingAddress(userId),
    enabled: userId !== 0,
    ...options
  });
}